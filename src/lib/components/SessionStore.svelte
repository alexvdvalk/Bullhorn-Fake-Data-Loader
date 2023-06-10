<script lang="ts">
  export let BhRestToken: string;
  export let restUrl: string;

  import { Session } from "$lib/store";
  import axios from "axios";

  const instance = axios.create({
    baseURL: restUrl,
    params: {
      BhRestToken,
    },
  });

  Session.set(instance);
</script>

<slot />
