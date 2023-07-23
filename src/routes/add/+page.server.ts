import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import axios from "axios";
import type { SettingsResponse } from "$lib/components/Interfaces";

export const load = (async ({ locals }) => {
  if (!locals.validSession) throw redirect(302, "/");
  const instance = axios.create({
    baseURL: locals.restUrl,
    params: { BhRestToken: locals.BhRestToken },
  });
  let { data } = await instance.get<SettingsResponse>(
    "services/settings/allEntitlementsAndSettings"
  );
  return { settings: data };
}) satisfies PageServerLoad;
