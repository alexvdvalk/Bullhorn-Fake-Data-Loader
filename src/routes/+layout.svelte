<script lang="ts">
  import "@skeletonlabs/skeleton/themes/theme-skeleton.css";
  import "@skeletonlabs/skeleton/styles/skeleton.css";
  import "../app.postcss";
  import BullhornSettings from "$lib/components/BullhornSettings.svelte";
  import SessionStore from "$lib/components/SessionStore.svelte";
  import TheHeader from "$lib/components/TheHeader.svelte";
  import { totalsArray } from "$lib/store";

  export let data;
  totalsArray.load(data.locals.restUrl, data.locals.BhRestToken);
</script>

<svelte:head>
  <title>Fake Data Loader</title>
</svelte:head>

<SessionStore
  restUrl={data.locals.restUrl}
  BhRestToken={data.locals.BhRestToken}
>
  <TheHeader />
  <BullhornSettings>
    <slot />
  </BullhornSettings>
</SessionStore>
