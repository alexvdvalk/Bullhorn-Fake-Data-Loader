<script lang="ts">
  import EntityLabel from "./EntityLabel.svelte";
  import { totalsArray } from "$lib/store";
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  onMount(() => {
    totalsArray.load($page.data.locals.restUrl, $page.data.locals.BhRestToken);
  });
</script>

<!-- Responsive Container (recommended) -->
<div class="table-container">
  <!-- Native Table Element -->
  <table class="table table-hover">
    <thead>
      <tr>
        <th>Entity</th>
        <th># Records</th>
      </tr>
    </thead>
    <tbody>
      {#each $totalsArray as { entity, total }, i}
        <tr>
          <td> <EntityLabel {entity} /> </td>
          <td>
            {#await total}
              Loading...
            {:then t}
              {t}
            {:catch _}
              Error
            {/await}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
