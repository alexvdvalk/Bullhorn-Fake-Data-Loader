import type { Handle } from "@sveltejs/kit";

export const handle = (async ({ event, resolve }) => {
  const restUrl =
    event.url.searchParams.get("restUrl") || event.cookies.get("restUrl");

  const BhRestToken =
    event.url.searchParams.get("BhRestToken") ||
    event.cookies.get("BhRestToken");
  const r = decodeURIComponent(restUrl!);
  const b = decodeURIComponent(BhRestToken!);
  if (r) event.cookies.set("restUrl", r);
  if (b) event.cookies.set("BhRestToken", b);
  event.locals.restUrl = r;
  event.locals.BhRestToken = b;

  const response = await resolve(event);
  return response;
}) satisfies Handle;
