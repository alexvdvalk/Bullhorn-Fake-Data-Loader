import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { checkPing } from "$lib/checkPing";

export const load = (async ({ locals, cookies }) => {
  const validSession = await checkPing(locals.restUrl, locals.BhRestToken);
  if (validSession) redirect(302, "/add");
  cookies.delete("restUrl", { path: "/" });
  cookies.delete("BhRestToken", { path: "/" });
}) satisfies PageServerLoad;
