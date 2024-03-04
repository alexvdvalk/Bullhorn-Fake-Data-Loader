import type { PageServerLoad } from "./$types";
import { checkPing } from "$lib/checkPing";
import { redirect } from "@sveltejs/kit";

export const load = (async ({ locals, url }) => {
  let ping;
  try {
    ping = await checkPing(locals.restUrl, locals.BhRestToken);
  } catch (err) {}
  if (ping) redirect(302, "/add");
  return { url: url.origin };
}) satisfies PageServerLoad;
