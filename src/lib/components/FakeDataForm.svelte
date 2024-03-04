<script lang="ts">
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";
  import type { SubmitFunction } from "@sveltejs/kit";
  import type { Entity } from "./Interfaces";

  export let entity: Entity;
  export let numberRecords: number;
  export let formLoading = false;

  const formSubmit: SubmitFunction = () => {
    formLoading = true;
    return async ({ update }) => {
      await update();
      formLoading = false;
    };
  };
</script>

<form method="post" use:enhance={formSubmit}>
  <label class="label">
    <span>Entity</span>
    <select class="select" value={entity} name="entity">
      {#each $page.data.entities as entity}
        <option value={entity.entity}>{entity.label}</option>
      {/each}
    </select>
  </label>

  <label class="label">
    <span># Records</span>
    <input
      class="input"
      type="number"
      name="count"
      min="1"
      max="30"
      value={numberRecords}
    />
  </label>
  <button type="submit" class="btn variant-filled mt-2">Add</button>
</form>
