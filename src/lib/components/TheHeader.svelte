<script lang="ts">
  import { AppBar } from "@skeletonlabs/skeleton";

  import { Session } from "$lib/store";
</script>

<AppBar>
  {#await $Session.get("settings/corporationName") then name}
    {name.data.corporationName} - DO NOT USE ON PRODUCTION SYSTEMS
  {/await}
</AppBar>
