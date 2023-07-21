import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ locals }) => {
  if (locals.validSession) throw redirect(302, "/add");
  throw redirect(302, "/");
};
