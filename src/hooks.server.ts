import { redirect, type Handle } from "@sveltejs/kit";
import axios from "axios";

export const handle = (async ({ event, resolve }) => {
  if (event.url.pathname === "/") {
    const response = await resolve(event);
    return response;
  }
  //Check if cookie with active tokens exists.
  const restUrlCookie = event.cookies.get("restUrl");
  const BhRestTokenCookie = event.cookies.get("BhRestToken");

  const validSessionFromCookies = await checkPing(
    restUrlCookie,
    BhRestTokenCookie
  );
  if (validSessionFromCookies) {
    event.locals.restUrl = restUrlCookie!;
    event.locals.BhRestToken = BhRestTokenCookie!;
    const response = await resolve(event);
    return response;
  } else {
    event.cookies.delete("BhRestToken");
    event.cookies.delete("restUrl");
  }

  //if no cookie, check if query params are provided
  const restUrl = event.url.searchParams.get("restUrl");
  const BhRestToken = event.url.searchParams.get("BhRestToken");

  const validParams = await checkPing(restUrl, BhRestToken);

  console.log({ validParams });
  if (validParams && restUrl && BhRestToken) {
    event.cookies.set("restUrl", decodeURIComponent(restUrl));
    event.cookies.set("BhRestToken", decodeURIComponent(BhRestToken));
    event.locals.restUrl = decodeURIComponent(restUrl);
    event.locals.BhRestToken = decodeURIComponent(BhRestToken);
    const response = await resolve(event);
    return response;
  }

  throw redirect(302, "/");
}) satisfies Handle;

const checkPing = async (
  restUrl: string | undefined | null,
  BhRestToken: string | undefined | null
) => {
  if (!restUrl || !BhRestToken) return false;
  try {
    await axios.get(`${restUrl}settings/userId?BhRestToken=${BhRestToken}`);
    return true;
  } catch (error) {
    return false;
  }
};
