import { redirect, type Handle } from "@sveltejs/kit";
import axios from "axios";

export const handle = (async ({ event, resolve }) => {
  const restUrl =
    event.url.searchParams.get("restUrl") || event.cookies.get("restUrl");

  const BhRestToken =
    event.url.searchParams.get("BhRestToken") ||
    event.cookies.get("BhRestToken");

  const validSession = await checkPing(restUrl, BhRestToken);

  if (event.url.pathname === "/" && validSession) {
    throw redirect(302, "/add");
  }

  if (validSession) {
    const r = decodeURIComponent(restUrl!);
    const b = decodeURIComponent(BhRestToken!);
    event.cookies.set("restUrl", r);
    event.cookies.set("BhRestToken", b);
    event.locals.restUrl = r;
    event.locals.BhRestToken = b;
    const response = await resolve(event);
    if (!response.ok) {
      throw redirect(302, "/add");
    }
    return response;
  }
  if (event.url.pathname !== "/") {
    throw redirect(302, "/");
  }
  const response = await resolve(event);

  return response;
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
