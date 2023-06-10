<script lang="ts">
  import EntityLabel from "./EntityLabel.svelte";
  import { Session, mainEntities } from "$lib/store";
  import { onMount } from "svelte";

  const isSearchable = (entity: string): boolean => {
    return (
      [
        "Candidate",
        "ClientContact",
        "ClientCorporation",
        "JobOrder",
        "Opportunity",
        "JobSubmission",
        "Placement",
        "Note",
        "Task",
      ].indexOf(entity) >= 0
    );
  };

  const getTotal = async (e: string): Promise<number> => {
    let method = isSearchable(e) ? "search" : "query";
    let filter = isSearchable(e) ? "query=id[* TO *]" : "where=id>0";
    let queryPath = `${method}/${e}?${filter}&fields=id&count=1&totalOnly=true`;
    let { data } = await $Session.get(queryPath);
    return data.total as number;
  };

  let output: {
    entity: string;
    total: Promise<number>;
  }[] = [];

  const refresh = () => {
    output = mainEntities.map((e) => {
      return {
        entity: e,
        total: getTotal(e),
      };
    });
  };

  onMount(() => {
    refresh();
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
      {#each output as row, i}
        <tr>
          <td> <EntityLabel entity={row.entity} /> </td>
          <td>
            {#await row.total then c}
              {c}
            {/await}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<!-- 
<DataTable table$aria-label="People list" style="width: 100%;">
  <Head>
    <Row>
      <Cell>Entity</Cell>
      <Cell numeric
        >Total <IconButton class="material-icons" on:click={refresh}
          >refresh</IconButton
        ></Cell
      >
    </Row>
  </Head>

  <Body>
    {#each output as rowCount}
      <Row>
        <Cell>
          <EntityLabel entity={rowCount.entity} />
        </Cell>
        <Cell numeric>
          {#await rowCount.total}
            <ProgressRadial width="w-4" />
          {:then t}
            {t}
          {/await}
        </Cell>
      </Row>
    {/each}
  </Body>
</DataTable> -->
