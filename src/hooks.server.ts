import { redirect, type Handle } from "@sveltejs/kit";
import axios from "axios";

export const handle = (async ({ event, resolve }) => {
  const restUrl = event.url.searchParams.get("restUrl");
  const BhRestToken = event.url.searchParams.get("BhRestToken");

  if (restUrl && BhRestToken) {
    event.cookies.set("restUrl", decodeURIComponent(restUrl));
    event.cookies.set("BhRestToken", decodeURIComponent(BhRestToken));
  }

  const restUrlCookie = event.cookies.get("restUrl");
  const BhRestTokenCookie = event.cookies.get("BhRestToken");

  const validSession = await checkPing(restUrlCookie, BhRestTokenCookie);

  if (validSession) {
    event.locals.restUrl = restUrlCookie!;
    event.locals.BhRestToken = BhRestTokenCookie!;
    const response = await resolve(event);
    return response;
  }

  throw redirect(
    302,
    `https://auth.bullhornstaffing.com/oauth/authorize?response_type=code&client_id=59aed264-3e31-49b7-83c6-ac541d170d36&redirect_uri=https://cls23.bullhornstaffing.com/core/oauth/callback&state=${encodeURI(
      event.url.href
    )}`
  );
}) satisfies Handle;

const checkPing = async (
  restUrl: string | undefined,
  BhRestToken: string | undefined
) => {
  if (!restUrl || !BhRestToken) return false;
  try {
    const { data } = await axios.get(
      `${restUrl}/ping?pingOnly=true&BhRestToken=${BhRestToken}`
    );
    console.log(data);
    return true;
  } catch (error) {
    return false;
  }
};
