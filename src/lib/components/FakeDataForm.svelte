<script lang="ts">
  import { mainEntities } from "$lib/store";
  import EntityLabel from "./EntityTotalList/EntityLabel.svelte";

  export let entity = mainEntities[0];
  export let numberRecords = 10;

  const submitted = () => {};
</script>

<form on:submit|preventDefault={submitted}>
  <label class="label">
    <span>Entity</span>
    <select class="select" bind:value={entity} on:change>
      {#each mainEntities as entity}
        <option value={entity}><EntityLabel {entity} /></option>
      {/each}
    </select>
  </label>

  <label class="label">
    <span># Records</span>
    <input
      class="input"
      type="number"
      min="1"
      max="30"
      bind:value={numberRecords}
    />
  </label>
</form>
