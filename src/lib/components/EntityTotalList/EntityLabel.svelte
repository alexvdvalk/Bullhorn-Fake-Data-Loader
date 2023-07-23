<script lang="ts">
  import { page } from "$app/stores";
  export let entity: string;
  export let plural: "Many" | "None" | "" = "";

  $: path = `entityTitle${entity}${plural}`;

  $: key = (($page.data.settings as any)[path] as string) || entity;
</script>

{key}
