<script lang="ts">
  import { topSites } from 'webextension-polyfill';
  import { onMount } from 'svelte';
  import Base from './Base.svelte';

  let sites = [];

  onMount(() => topSites.get().then(s => (sites = s.slice(0, 8))));
</script>

<Base title="Top Sites">
  <div class="grid grid-cols-[repeat(auto-fit,_minmax(7rem,_1fr))]">
    {#each sites as site}
      <a href={site.url} class="mx-auto flex flex-col items-center">
        <img
          class="w-16 h-16"
          src="https://s2.googleusercontent.com/s2/favicons?domain={encodeURIComponent(
            site.url
          )}&sz=64"
          alt=""
          width="64"
          height="64"
        />
        <p class="w-28 h-6 truncate">{site.title}</p>
      </a>
    {/each}
  </div>
</Base>
