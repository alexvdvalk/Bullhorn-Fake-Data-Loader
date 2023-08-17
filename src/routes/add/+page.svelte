<script lang="ts">
  import EntityTotals from "$lib/components/EntityTotalList/EntityTotals.svelte";
  import FakeDataForm from "$lib/components/FakeDataForm.svelte";
  import type { Entity } from "$lib/components/Interfaces";
  import { EntityTypes } from "@bullhorn/bullhorn-types";
  import type { ActionData } from "./$types";
  import Loader from "$lib/components/Loader.svelte";

  let entity: Entity = EntityTypes.Candidate;
  let numberRecords = 2;
  let formLoading: boolean;

  export let form: ActionData;

  $: if (form?.count && +form?.count) numberRecords = +form.count;
  $: if (form?.entity && typeof form.entity === "string")
    entity = form.entity as Entity;
</script>

<div class="flex flex-col gap-4 justify-center px-2 md:px-12 md:flex-row">
  {#if formLoading}
    <Loader />
  {:else}
    <div class="m-2 flex-grow max-w-full md:max-w-md">
      <FakeDataForm {numberRecords} {entity} bind:formLoading />
      {#if form !== null}
        {#if form.successful}
          <div>
            <p>Created Ids</p>
            <ul>
              {#each form.successful as i}
                <li>
                  <a
                    class="anchor"
                    target="_blank"
                    href={`https://cls29.bullhornstaffing.com/BullhornSTAFFING/OpenWindow.cfm?Entity=${form.entity}&id=${i}`}
                  >
                    {i}
                  </a>
                </li>
              {/each}
            </ul>
          </div>
        {/if}
        <div>
          Failed: {form.failedCount}
        </div>
      {/if}
    </div>
    <div class="m-2">
      <EntityTotals />
    </div>
  {/if}
</div>
