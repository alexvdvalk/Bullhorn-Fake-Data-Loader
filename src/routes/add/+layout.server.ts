import type { AxiosInstance } from "axios";
import type { LayoutServerLoad } from "./$types";
import type { SettingsResponse } from "$lib/components/Interfaces";
import axios from "axios";
import { mainEntities } from "$lib/store";
import { redirect, type Cookies } from "@sveltejs/kit";

export const load = (async ({ locals, cookies }) => {
  const instance = axios.create({
    baseURL: locals.restUrl,
    params: { BhRestToken: locals.BhRestToken },
  });

  try {
    const settings = await getSettings(instance, cookies);
    const entities = mainEntities.map((ent) => {
      return {
        entity: ent,
        label: (settings.settings as any)[`entityTitle${ent}`] || ent,
      };
    });

    return {
      settings: settings,
      entities,
    };
  } catch (error) {
    throw redirect(302, "/");
  }
}) satisfies LayoutServerLoad;

const getSettings = async (instance: AxiosInstance, cookies: Cookies) => {
  const fromCookies = cookies.get("entityLabels");
  if (fromCookies) {
    return { settings: JSON.parse(fromCookies) };
  }
  let { data } = await instance.get<SettingsResponse>(
    "services/settings/allEntitlementsAndSettings"
  );
  let newSettings: any = {};

  Object.keys(data.settings).forEach((attribute) => {
    for (let ent of mainEntities) {
      if (
        attribute === `entityTitle${ent}` ||
        attribute === `entityTitle${ent}Many` ||
        attribute === "corporationName"
      ) {
        newSettings[attribute] = (data.settings as any)[attribute];
      }
    }
  });
  cookies.set("entityLabels", JSON.stringify(newSettings));
  return { settings: newSettings };
};
