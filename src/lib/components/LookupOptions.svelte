<script lang="ts">
  import { onMount } from "svelte";
  import type { Field5 } from "./Interfaces";
  import { Session } from "$lib/store";
  export let fields: Field5[] = [];

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
    console.log("optionsFields", optionsFields);
    let promArray = optionsFields.map((i) => loadOptions(i));
    await Promise.allSettled(promArray);
    console.log("OUTPUT", output);
    loaded = true;
  });
</script>

{#if loaded}
  <slot options={output} />
{/if}
