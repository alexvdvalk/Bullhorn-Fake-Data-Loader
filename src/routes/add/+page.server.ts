import { type Actions, fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import axios, { type AxiosInstance } from "axios";
import {
  countries,
  getTotal,
  mainEntities,
  telephoneNumberFields,
} from "$lib/store";
import type { BullhornMetaResponse } from "$lib/Responses";
import type { FieldMap } from "$lib/FieldMap";
import { faker } from "@faker-js/faker";
import type { EntityTitleResponse } from "$lib/interfaces";
export const load = (async ({ locals }) => {
  const instance = axios.create({
    baseURL: locals.restUrl,
    params: { BhRestToken: locals.BhRestToken },
  });
  const settings = await getSettings(instance);

  const entityCounts = mainEntities.map((ent) => {
    let label = (settings as any)[`entityTitle${ent}Many`] || ent;
    return {
      entity: ent,
      label,
      total: getTotal(
        ent,
        locals.restUrl as string,
        locals.BhRestToken as string
      ),
    };
  });

  const entities = mainEntities.map((ent) => {
    return {
      entity: ent,
      label: (settings as any)[`entityTitle${ent}`] || ent,
    };
  });
  return {
    totals: entityCounts,
    corporationDetails: {
      corporationName: settings.corporationName,
      corporationId: settings.corporationId,
    },
    entities,
    restUrl: locals.restUrl,
    BhRestToken: locals.BhRestToken,
  };
}) satisfies PageServerLoad;

const getSettings = async (instance: AxiosInstance) => {
  try {
    const entities = [
      "entityTitleCandidate",
      "entityTitleCandidateMany",
      "entityTitleClientContact",
      "entityTitleClientContactMany",
      "entityTitleJobOrder",
      "entityTitleJobOrderMany",
      "entityTitlePlacement",
      "entityTitlePlacementMany",
      "entityTitleSendout",
      "entityTitleSendoutMany",
      "entityTitleJobSubmission",
      "entityTitleJobSubmissionMany",
      "entityTitleClientCorporation",
      "entityTitleClientCorporationMany",
      "entityTitleLead",
      "entityTitleLeadMany",
      "entityTitleOpportunity",
      "entityTitleOpportunityMany",
    ];
    let { data } = await instance.get<EntityTitleResponse>(
      `settings/${entities.join(",")},corporationName,corporationId`
    );
    return data;
  } catch (err) {
    redirect(302, "/");
  }
};

export const actions = {
  default: async (event) => {
    const data = await event.request.formData();
    const entity = data.get("entity");
    const count = data.get("count");
    const instance = axios.create({
      baseURL: event.locals.restUrl,
      params: { BhRestToken: event.locals.BhRestToken },
    });
    if (typeof entity !== "string") {
      return fail(400, { entity, missing: true });
    }
    if (!count) {
      return fail(400, { count, missing: true });
    }
    const meta = await getMeta(entity, instance);
    const options = await getOptions(meta, instance);
    const fakeRecords = generateItems(entity, +count, meta, options);
    const addResult = await addFakeRecords(fakeRecords, entity, instance);
    const successfulAdds = getSuccessfulAdds(addResult);
    const failedCount = getFailedCount(addResult);
    return {
      successful: successfulAdds,
      failedCount: failedCount,
      entity: entity,
      count: +count,
    };
  },
} satisfies Actions;

const getSuccessfulAdds = (
  resultsArray: PromiseSettledResult<any>[]
): number[] => {
  const successful: number[] = resultsArray
    .filter((i) => i.status === "fulfilled")
    .map((item) => {
      if (item.status === "fulfilled") {
        return item.value.data.changedEntityId;
      }
    });
  return successful || [];
};

const getFailedCount = (resultsArray: PromiseSettledResult<any>[]) => {
  const failed = resultsArray.filter(
    (i) => i.status === "rejected"
  ) as PromiseRejectedResult[];
  // const failedResponses = failed.map((i) => i.response.data);
  // console.log("failed", failedResponses);
  return failed.length;
};

const addFakeRecords = async (
  fakeRecords: any[],
  entity: string,
  instance: AxiosInstance
) => {
  let promArray: Promise<any>[] = fakeRecords.map((i) =>
    instance.put<EntityPutResponse>(`/entity/${entity}`, i)
  );
  return Promise.allSettled(promArray);
};

interface EntityPutResponse {
  changeType: string;
  changedEntityType: string;
  changedEntityId: number;
  data: any;
}

const generateItems = (
  entity: string,
  num: number,
  fields: FieldMap[],
  options: { [key: string]: string[] | number[] }
) => {
  let output = [];
  for (let i = 0; i < num; i++) {
    let obj: any = {};
    fields.forEach((field) => {
      if (field.name === "firstName") {
        obj[field.name] = faker.person.firstName();
      } else if (field.name === "title") {
        obj[field.name] = faker.person.jobTitle();
      } else if (field.name === "name") {
        obj[field.name] = faker.company.name();
      } else if (field.name === "lastName") {
        obj[field.name] = faker.person.lastName();
      } else if (field.name === "companyName") {
        obj[field.name] = faker.company.name();
      } else if (field.name === "occupation") {
        obj[field.name] = faker.person.jobTitle();
      } else if (telephoneNumberFields.includes(field.name)) {
        obj[field.name] = faker.phone.number();
      } else if (field.name.startsWith("email")) {
        obj[field.name] = faker.internet.email();
      } else if (field.optionsType && options[field.optionsType]) {
        const randomOption =
          options[field.optionsType][
            Math.floor(Math.random() * options[field.optionsType].length)
          ];

        if (field.type === "TO_MANY" && randomOption) {
          obj[field.name] = {
            replaceAll: [randomOption],
          };
        } else if (field.type === "TO_ONE" && randomOption) {
          obj[field.name] = {
            id: randomOption,
          };
        } else if (field.multiValue) {
          obj[field.name] = [randomOption];
        } else if (!field.multiValue) {
          obj[field.name] = randomOption;
        }
      } else if (field.options && field.options.length > 0) {
        obj[field.name] =
          field.options[Math.floor(Math.random() * field.options.length)].value;
      } else if (field.dataSpecialization === "DATE") {
        obj[field.name] = faker.date
          .between({
            from: "2020-01-01T00:00:00.000Z",
            to: "2030-01-01T00:00:00.000Z",
          })
          .getTime();
      } else if (field.dataType === "String") {
        obj[field.name] = faker.lorem.sentences().slice(0, field.maxLength);
      } else if (field.dataType === "Boolean") {
        obj[field.name] = Math.random() > 0.5;
      } else if (field.inputType === "TEXTAREA") {
        obj[field.name] = faker.lorem.paragraph();
      } else if (
        field.dataSpecialization &&
        ["MONEY", "INTEGER", "FLOAT"].includes(field.dataSpecialization)
      ) {
        obj[field.name] = faker.number.int({ min: 0, max: 1000 });
      } else if (
        field.type === "COMPOSITE" &&
        field.dataSpecialization === "ADDRESS_BLOCK"
      ) {
        obj[field.name] = {
          address1: faker.location.streetAddress(),
          city: faker.location.city(),
          countryID:
            countries[Math.floor(Math.random() * countries.length)].value,
          zip: faker.location.zipCode(),
        };
      }
    });
    if (obj.migrateGUID) delete obj.migrateGUID;
    if (entity === "Placement" && obj.clientContact) delete obj.clientContact;
    if (entity === "Candidate") {
      obj.name = `${obj.firstName} ${obj.lastName}`;
    }
    if (obj.owners) delete obj.owners;
    if (obj.isDeleted) delete obj.isDeleted;
    if (obj.childClientCorporations) delete obj.childClientCorporations;
    if (obj.activePlacements) delete obj.activePlacements;
    if (entity === "Placement" && obj.jobSubmission) delete obj.jobSubmission;
    if (entity === "JobOrder" && obj.placements) delete obj.placements;
    if (obj.estaffGUID) delete obj.estaffGUID;
    if (entity === "Placement" && obj.clientCorporation)
      delete obj.clientCorporation;
    if (entity === "Placement" && obj.owner) delete obj.owner;
    output.push(obj);
  }
  return output;
};

const getOptions = async (fields: FieldMap[], instance: AxiosInstance) => {
  let output: { [key: string]: string[] | number[] } = {};
  const loadOptions = async (option: string | undefined) => {
    if (!option) return;
    try {
      const { data } = await instance.get(`options/${option}?count=300`);
      output[option] = data.data.map((i: { value: number }) => i.value);
    } catch (error) {}
  };
  let optionsFields = [
    ...new Set(
      fields.filter((field) => !!field.optionsUrl).map((i) => i.optionsType)
    ),
  ];
  let promArray = optionsFields.map((i) => loadOptions(i));
  await Promise.allSettled(promArray);
  return output;
};

const getMeta = async (
  entity: string,
  instance: AxiosInstance
): Promise<FieldMap[]> => {
  const { data } = await instance.get<BullhornMetaResponse>(`meta/${entity}`, {
    params: {
      fields: "*",
      meta: "full",
    },
  });
  const fields = data.fields.filter((field) =>
    field.hasOwnProperty("sortOrder")
  );
  return fields;
};
