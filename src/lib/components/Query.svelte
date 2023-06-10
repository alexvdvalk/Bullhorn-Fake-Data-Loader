<script lang="ts">
  import axios, { isAxiosError } from "axios";
  import { Session } from "$lib/store";

  export let queryPath: string = "";

  const axQuery = async (qp: string) => {
    if (!qp) return;
    try {
      const { data } = await $Session.get(qp);
      return data;
    } catch (error) {
      console.log("erro", error);
      if (error && isAxiosError(error)) {
        throw new Error(
          error.response?.data.errorMessage || "Something went wrong"
        );
      }
      throw new Error("Something went wrong");
    }
  };
</script>

{#await axQuery(queryPath)}
  <slot name="loading">Loading...</slot>
{:then out}
  <slot {out} />
{:catch err}
  {err.message}
{/await}
