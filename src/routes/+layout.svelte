<script lang="ts">
  import "@skeletonlabs/skeleton/themes/theme-skeleton.css";
  import "@skeletonlabs/skeleton/styles/skeleton.css";
  import "../app.css";
  import BullhornSettings from "$lib/components/BullhornSettings.svelte";
  import SessionStore from "$lib/components/SessionStore.svelte";
  import TheHeader from "$lib/components/TheHeader.svelte";

  export let data;
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
