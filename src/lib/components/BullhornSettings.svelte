<script lang="ts">
  import { Session, settings, type SettingsResponse } from "$lib/store";
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
  <!-- <Loader /> -->
{/await}
