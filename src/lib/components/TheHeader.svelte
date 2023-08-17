<script lang="ts">
  import { page } from "$app/stores";
  import { AppBar } from "@skeletonlabs/skeleton";
</script>

<AppBar gridColumns="grid-cols-1">
  <div class="w-full text-ellipsis whitespace-nowrap overflow-hidden">
    <span>
      {$page.data.settings.corporationName} - DO NOT USE ON PRODUCTION SYSTEMS
    </span>
  </div>
</AppBar>
