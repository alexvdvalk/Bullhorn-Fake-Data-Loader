<script lang="ts">
  export let entity: string;
  import { Session } from "$lib/store";

  import type { Field5, MetaResonse } from "./Interfaces";

  const getMeta = async (entity = "Candidate"): Promise<Field5[]> => {
    const { data } = await $Session.get<MetaResonse>(`meta/${entity}`, {
      params: {
        fields: "*",
        meta: "full",
      },
    });
    let fields = data.fields.filter((field) =>
      field.hasOwnProperty("sortOrder")
    );
    fields.sort(compareFunction);
    return fields;
  };

  function compareFunction(a: Field5, b: Field5) {
    if (a.sortOrder! > b.sortOrder!) return 1;
    else return -1;
  }
</script>

{#await getMeta(entity)}
  <slot name="loading">Loading...</slot>
{:then f}
  <slot fields={f} />
{/await}
