<script lang="ts">
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
  <slot />
</SessionStore>
