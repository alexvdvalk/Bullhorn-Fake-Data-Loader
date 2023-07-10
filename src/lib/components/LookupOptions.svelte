<script lang="ts">
  import { onMount } from "svelte";
  import { Session } from "$lib/store";
  import type { FieldMap } from "$lib/FieldMap";
  export let fields: FieldMap[] = [];

  let output: any = {};

  const loadOptions = async (option: string | undefined) => {
    if (!option) return;
    try {
      const { data } = await $Session.get(`options/${option}?count=300`);
      output[option] = data.data.map((i: { value: number }) => i.value);
    } catch (error) {}
  };

  let loaded = false;
  onMount(async () => {
    let optionsFields = [
      ...new Set(
        fields.filter((field) => !!field.optionsUrl).map((i) => i.optionsType)
      ),
    ];
    let promArray = optionsFields.map((i) => loadOptions(i));
    await Promise.allSettled(promArray);
    loaded = true;
  });
</script>

{#if !loaded}
  <slot name="loading">Loading...</slot>
{:else}
  <slot options={output} />
{/if}
