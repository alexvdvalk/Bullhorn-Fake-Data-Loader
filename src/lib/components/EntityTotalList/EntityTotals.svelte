<script lang="ts">
  import { page } from "$app/stores";
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
      {#each $page.data.totals as { total, label }, i}
        <tr>
          <td> {label}</td>
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
