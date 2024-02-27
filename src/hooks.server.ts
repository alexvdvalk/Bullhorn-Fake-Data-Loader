import type { Handle } from "@sveltejs/kit";

export const handle = (async ({ event, resolve }) => {
  const restUrl =
    event.cookies.get("restUrl") || event.url.searchParams.get("restUrl");

  const BhRestToken =
    event.cookies.get("BhRestToken") ||
    event.url.searchParams.get("BhRestToken");
  const r = decodeURIComponent(restUrl!);
  const b = decodeURIComponent(BhRestToken!);
  if (r)
    event.cookies.set("restUrl", r, {
      path: "/",
    });
  if (b) event.cookies.set("BhRestToken", b, { path: "/" });
  event.locals.restUrl = r;
  event.locals.BhRestToken = b;

  const response = await resolve(event);
  return response;
}) satisfies Handle;
