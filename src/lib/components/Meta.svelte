<script lang="ts">
  import type { FieldMap } from "$lib/FieldMap";
  import type { BullhornMetaResponse } from "$lib/Responses";
  export let entity: string;
  import { Session } from "$lib/store";

  const getMeta = async (entity = "Candidate"): Promise<FieldMap[]> => {
    const { data } = await $Session.get<BullhornMetaResponse>(
      `meta/${entity}`,
      {
        params: {
          fields: "*",
          meta: "full",
        },
      }
    );
    const fields = data.fields.filter((field) =>
      field.hasOwnProperty("sortOrder")
    );
    return fields;
  };
</script>

{#await getMeta(entity)}
  <slot name="loading">Loading...</slot>
{:then f}
  <slot fields={f} />
{/await}
