import { mainEntities, getTotal } from "./store";

export const createTotalsArray = (
  settings: any,
  restUrl: string,
  BhRestToken: string
) => {
  const entityCounts = mainEntities.map((ent) => {
    let label = (settings as any)[`entityTitle${ent}Many`] || ent;
    return {
      entity: ent,
      label,
      total: getTotal(ent, restUrl, BhRestToken),
    };
  });

  return {
    get entityCounts() {
      return entityCounts;
    },
  };
};
