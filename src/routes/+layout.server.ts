import type { LayoutServerLoad } from "./$types";
import type { Config } from "@sveltejs/adapter-vercel";

export const config: Config = {
  runtime: "nodejs18.x",
  regions: [`lhr1`],
};

export const load = (async ({ locals }) => {
  return {
    locals,
  };
}) satisfies LayoutServerLoad;
