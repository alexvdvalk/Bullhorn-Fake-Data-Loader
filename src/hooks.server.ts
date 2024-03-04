import type { Handle } from "@sveltejs/kit";

export const handle = (async ({ event, resolve }) => {
  const restUrl = event.cookies.get("restUrl");
  const BhRestToken = event.cookies.get("BhRestToken");

  event.locals.restUrl = restUrl;
  event.locals.BhRestToken = BhRestToken;

  const response = await resolve(event);
  return response;
}) satisfies Handle;
