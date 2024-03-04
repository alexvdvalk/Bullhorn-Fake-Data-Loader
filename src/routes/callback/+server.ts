import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { dev } from "$app/environment";

export const GET: RequestHandler = async ({ url, cookies, locals }) => {
  const restUrl = url.searchParams.get("restUrl");
  const BhRestToken = url.searchParams.get("BhRestToken");

  if (!restUrl || !BhRestToken) redirect(302, "/");

  const options = {
    path: "/",
    httpOnly: true,
    secure: !dev,
    maxAge: 60 * 60 * 24 * 30,
  };

  cookies.set("restUrl", restUrl, options);
  cookies.set("BhRestToken", BhRestToken, options);

  redirect(302, "/add");
};
