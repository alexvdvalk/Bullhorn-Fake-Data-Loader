import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url, cookies, locals }) => {
  const restUrl = url.searchParams.get("restUrl");
  const BhRestToken = url.searchParams.get("BhRestToken");

  if (!restUrl || !BhRestToken) redirect(302, "/");

  cookies.set("restUrl", restUrl, {
    path: "/",
    maxAge: 60 * 60 * 24,
  });
  cookies.set("BhRestToken", BhRestToken, {
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  redirect(302, "/add");
};
