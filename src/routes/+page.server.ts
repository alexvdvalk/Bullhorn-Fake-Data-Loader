import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { checkPing } from "$lib/checkPing";

export const load = (async ({ locals, url }) => {
  try {
    await checkPing(locals.restUrl!, locals.BhRestToken!);
    redirect(302, "/add");
  } catch (err) {
    console.log(err);
  }
  return { url: url.origin };
}) satisfies PageServerLoad;
