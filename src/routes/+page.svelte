<script lang="ts">
  export let data;
</script>

<section class="h-full w-full flex justify-center items-center">
  <div>
    <a
      class="btn btn-xl bg-gradient-to-br variant-gradient-secondary-tertiary"
      href={`https://auth.bullhornstaffing.com/oauth/authorize?response_type=code&client_id=59aed264-3e31-49b7-83c6-ac541d170d36&redirect_uri=https://cls29.bullhornstaffing.com/core/oauth/callback&state=${data.url}/callback`}
    >
      Login with Bullhorn
    </a>
  </div>
</section>
