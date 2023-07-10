<script lang="ts">
  import { page } from "$app/stores";
  import EntityTotals from "$lib/components/EntityTotalList/EntityTotals.svelte";
  import FakeDataForm from "$lib/components/FakeDataForm.svelte";
  import type { Entity } from "$lib/components/Interfaces";
  import LookupOptions from "$lib/components/LookupOptions.svelte";
  import Meta from "$lib/components/Meta.svelte";
  import RandomRecords from "$lib/components/RandomRecords.svelte";
  import { Session, totalsArray } from "$lib/store";

  let entity: Entity;
  let numberRecords: number;

  let adding = false;
  let result: PromiseSettledResult<any>[] = [];

  let resolvedPromises: PromiseFulfilledResult<any>[] = [];
  $: resolvedPromises = result.filter(
    (i) => i.status === "fulfilled"
  ) as PromiseFulfilledResult<any>[];

  const addRecords = async (entity: Entity, records: any[]) => {
    adding = true;
    result = [];
    let promArray: Promise<any>[] = [];
    records.map((i) => {
      promArray.push($Session.put(`/entity/${entity}`, i));
    });
    let out = await Promise.allSettled(promArray);
    console.log("out", out);
    adding = false;
    result = out;
    totalsArray.reloadEntity(
      entity,
      $page.data.locals.restUrl,
      $page.data.locals.BhRestToken
    );
  };
</script>

<div class="flex flex-row gap-4 justify-around px-2 md:px-12">
  <div class="m-2 flex-grow">
    <FakeDataForm bind:numberRecords bind:entity />
    <Meta {entity} let:fields>
      {#if fields}
        <LookupOptions {fields} let:options>
          {#if options}
            <RandomRecords
              let:output
              {fields}
              numberOfRecords={numberRecords}
              {options}
              {entity}
            >
              <button
                on:click={() => {
                  addRecords(entity, output);
                }}
                type="button"
                class="btn variant-filled mt-2"
                disabled={adding}>Add</button
              >
              {#if result.length > 0}
                <div>
                  <p>Created Ids</p>
                  <ul>
                    {#each resolvedPromises as i}
                      <li>
                        <a
                          class="anchor"
                          target="_blank"
                          href={`https://cls29.bullhornstaffing.com/BullhornSTAFFING/OpenWindow.cfm?Entity=${entity}&id=${i.value.data.changedEntityId}`}
                        >
                          {i.value.data.changedEntityId}
                        </a>
                      </li>
                    {/each}
                  </ul>
                </div>
                <div>
                  Failed: {result.filter((i) => i.status === "rejected").length}
                </div>
              {/if}
            </RandomRecords>
          {/if}
        </LookupOptions>
      {/if}
    </Meta>
  </div>
  <div class="m-2">
    <EntityTotals />
  </div>
</div>
