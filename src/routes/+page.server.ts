import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ locals, url }) => {
  if (locals.BhRestToken && locals.restUrl) redirect(302, "/add");

  return { url: url.origin };
}) satisfies PageServerLoad;
