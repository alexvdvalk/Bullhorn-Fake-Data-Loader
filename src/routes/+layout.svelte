<script lang="ts">
  import "../app.postcss";
  import { page } from "$app/stores";
  import { dev } from "$app/environment";
</script>

<slot />

{#if dev}
  <pre>{JSON.stringify($page, null, 2)}</pre>
{/if}
