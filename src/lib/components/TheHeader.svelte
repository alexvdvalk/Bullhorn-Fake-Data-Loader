<script lang="ts">
  import { AppBar } from "@skeletonlabs/skeleton";

  import { Session } from "$lib/store";
</script>

<AppBar gridColumns="grid-cols-1">
  {#await $Session.get("settings/corporationName") then name}
    <div class="w-full text-ellipsis whitespace-nowrap overflow-hidden">
      <span>
        {name.data.corporationName} - DO NOT USE ON PRODUCTION SYSTEMS
      </span>
    </div>
  {/await}
</AppBar>
