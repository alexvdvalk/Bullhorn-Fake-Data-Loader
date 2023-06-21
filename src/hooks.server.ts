import { redirect, type Handle } from "@sveltejs/kit";
import axios from "axios";

export const handle = (async ({ event, resolve }) => {
  //Cookie check
  const restUrlCookie = event.cookies.get("restUrl");
  const BhRestTokenCookie = event.cookies.get("BhRestToken");

  const validSession = await checkPing(restUrlCookie, BhRestTokenCookie);
  if (validSession && restUrlCookie && BhRestTokenCookie) {
    event.locals.restUrl = restUrlCookie;
    event.locals.BhRestToken = BhRestTokenCookie;
    const response = await resolve(event);
    return response;
  }

  //Search Params check
  const restUrl = event.url.searchParams.get("restUrl");
  const BhRestToken = event.url.searchParams.get("BhRestToken");

  const validParams = await checkPing(restUrl, BhRestToken);

  if (validParams && restUrl && BhRestToken) {
    event.cookies.set("restUrl", decodeURIComponent(restUrl));
    event.cookies.set("BhRestToken", decodeURIComponent(BhRestToken));
    event.locals.restUrl = decodeURIComponent(restUrl);
    event.locals.BhRestToken = decodeURIComponent(BhRestToken);
    const response = await resolve(event);
    return response;
  }

  //Else redirect to auth server

  event.url.searchParams.delete("BhRestToken");
  event.url.searchParams.delete("restUrl");

  throw redirect(
    302,
    `https://auth-emea9.bullhornstaffing.com/oauth/authorize?response_type=code&client_id=59aed264-3e31-49b7-83c6-ac541d170d36&redirect_uri=https://cls29.bullhornstaffing.com/core/oauth/callback&state=${encodeURI(
      event.url.href
    )}`
  );
}) satisfies Handle;

const checkPing = async (
  restUrl: string | undefined | null,
  BhRestToken: string | undefined | null
) => {
  if (!restUrl || !BhRestToken) return false;
  try {
    const { data } = await axios.get(
      `${restUrl}settings/userId?BhRestToken=${BhRestToken}`
    );
    console.log(data);
    return true;
  } catch (error) {
    return false;
  }
};
