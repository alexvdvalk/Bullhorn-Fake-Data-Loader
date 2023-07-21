import type { LayoutServerLoad } from "./$types";
import type { Config } from "@sveltejs/adapter-vercel";

export const config: Config = {
  runtime: "edge",
  regions: [`lhr1`],
};

export const load = (async ({ locals }) => {
  return {
    locals,
  };
}) satisfies LayoutServerLoad;
