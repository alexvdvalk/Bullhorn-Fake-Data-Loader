<script lang="ts">
  import { Session, settings } from "$lib/store";
  import type { SettingsResponse } from "./Interfaces";
  import Loader from "./Loader.svelte";

  const loadSettings = async () => {
    let { data } = await $Session.get<SettingsResponse>(
      "services/settings/allEntitlementsAndSettings"
    );
    settings.set(data);
  };
</script>

{#await loadSettings()}
  <Loader />
{:then _}
  <slot />
{/await}
