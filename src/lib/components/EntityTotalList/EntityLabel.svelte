<script lang="ts">
  import { settings } from "$lib/store";

  export let entity: string;
  export let plural: "Many" | "None" | "" = "";

  $: path = `entityTitle${entity}${plural}`;

  $: key = (($settings.settings as any)[path] as any) || entity;
</script>

{key}
