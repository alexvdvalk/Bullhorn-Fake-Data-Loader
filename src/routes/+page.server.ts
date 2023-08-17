import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { checkPing } from "$lib/checkPing";

export const load = (async ({ locals, cookies }) => {
  const validSession = await checkPing(locals.restUrl, locals.BhRestToken);
  if (validSession) throw redirect(302, "/add");
  cookies.delete("restUrl");
  cookies.delete("BhRestToken");
}) satisfies PageServerLoad;
