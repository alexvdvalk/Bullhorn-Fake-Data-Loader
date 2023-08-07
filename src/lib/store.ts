import { EntityTypes } from "@bullhorn/bullhorn-types";
import axios from "axios";

export const mainEntities = [
  EntityTypes.Candidate,
  EntityTypes.ClientContact,
  EntityTypes.JobOrder,
  EntityTypes.Placement,
  EntityTypes.Appointment,
  EntityTypes.Sendout,
  EntityTypes.JobSubmission,
  EntityTypes.Note,
  EntityTypes.ClientCorporation,
  EntityTypes.Lead,
  EntityTypes.Opportunity,
];

const isSearchable = (entity: string): boolean => {
  return (
    [
      "Candidate",
      "ClientContact",
      "ClientCorporation",
      "JobOrder",
      "Opportunity",
      "JobSubmission",
      "Placement",
      "Note",
      "Task",
    ].indexOf(entity) >= 0
  );
};

export const getTotal = async (
  e: string,
  restUrl: string,
  BhRestToken: string
): Promise<number> => {
  const method = isSearchable(e) ? "search" : "query";
  const filter = isSearchable(e) ? "query=id[* TO *]" : "where=id>0";
  const queryPath = `${method}/${e}?${filter}&fields=id&count=1&totalOnly=true`;
  const instance = axios.create({ baseURL: restUrl, params: { BhRestToken } });
  const { data } = await instance.get<{ total: number }>(queryPath);
  return data.total as number;
};

// export const getTotalsArray = () => {
//   const { set, subscribe, update } = writable<
//     { entity: string; total: Promise<number> }[]
//   >([]);

//   const load = (restUrl: string, BhRestToken: string) => {
//     let d = mainEntities.map((entity) => {
//       return {
//         entity,
//         total: getTotal(entity, restUrl, BhRestToken),
//       };
//     });
//     set(d);
//   };

//   const reloadEntity = (
//     entity: Entity,
//     restUrl: string,
//     BhRestToken: string
//   ) => {
//     update((totals) => {
//       let e = totals.find((i) => i.entity === entity);
//       if (e) {
//         e.total = getTotal(e.entity, restUrl, BhRestToken);
//       }
//       return totals;
//     });
//   };

//   return { load, subscribe, reloadEntity };
// };

// export const totalsArray = getTotalsArray();
