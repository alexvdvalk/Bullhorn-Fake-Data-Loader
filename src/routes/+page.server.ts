import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import axios from "axios";

export const load = (async ({ locals }) => {
  const validSession = await checkPing(locals.restUrl, locals.BhRestToken);
  if (validSession) throw redirect(302, "/add");
}) satisfies PageServerLoad;

const checkPing = async (
  restUrl: string | undefined | null,
  BhRestToken: string | undefined | null
) => {
  if (!restUrl || !BhRestToken) return false;
  try {
    await axios.get(`${restUrl}settings/userId?BhRestToken=${BhRestToken}`);
    return true;
  } catch (error) {
    return false;
  }
};
