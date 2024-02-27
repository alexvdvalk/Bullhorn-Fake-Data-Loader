import type { AxiosInstance } from "axios";
import type { LayoutServerLoad } from "./$types";
import type { SettingsResponse } from "$lib/components/Interfaces";
import axios from "axios";
import { mainEntities } from "$lib/store";
import { redirect, type Cookies } from "@sveltejs/kit";
import { checkPing } from "$lib/checkPing";

export const load = (async ({ url, locals, cookies }) => {
  if (url.search.length > 0) {
    redirect(302, "/add");
  }
  const instance = axios.create({
    baseURL: locals.restUrl,
    params: { BhRestToken: locals.BhRestToken },
  });

  let settings: any;

  try {
    settings = getSettingsFromCookie(cookies);
    if (settings && (await !checkPing(locals.restUrl, locals.BhRestToken))) {
      throw new Error("error");
    }

    settings = await getSettings(instance, cookies);

    const entities = mainEntities.map((ent) => {
      return {
        entity: ent,
        label: (settings as any)[`entityTitle${ent}`] || ent,
      };
    });
    return {
      settings: settings,
      entities,
    };
  } catch (error) {
    // redirect(302, "/");
  }
}) satisfies LayoutServerLoad;

const getSettingsFromCookie = (cookies: Cookies) => {
  try {
    const fromCookies = cookies.get("entityLabels");
    if (fromCookies) {
      return { settings: JSON.parse(fromCookies) };
    }
  } catch (error) {
    return;
  }
};

const getSettings = async (instance: AxiosInstance, cookies: Cookies) => {
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
  cookies.set("entityLabels", JSON.stringify(newSettings), { path: "/" });
  return newSettings;
};
