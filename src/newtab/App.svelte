<script lang="ts">
  import TopSitesBlock from './components/blocks/TopSites.svelte';
  import SearchBlock from './components/blocks/Search.svelte';
  import Settings from './components/Settings.svelte';
  import { storage } from 'webextension-polyfill';
  import settings from './settings';

  let isSettingsOpen = false,
    bgImage = '';

  const getUnsplashImages = () =>
    fetch(
      'https://api.unsplash.com/photos/random?count=10&topics=bo8jQKTaE0Y&orientation=landscape',
      {
        headers: {
          Authorization:
            'Client-ID 1351e7003b0e869c6d7b221fe548c25216b16571ad28866446c06196ba1902d7'
        }
      }
    )
      .then(r => r.json())
      .then(r => r.map(w => w.urls.regular));

  $: if ($settings.background.startsWith('unsplash'))
    storage.local.get('backgrounds').then(async ({ backgrounds }) => {
      console.log(backgrounds);
      if (!backgrounds) backgrounds = await getUnsplashImages();
      bgImage = backgrounds.shift();
      if (backgrounds.length < 4) {
        backgrounds = [...backgrounds, ...(await getUnsplashImages())];
        await storage.local.set({ backgrounds });
      }
      if ($settings.background === 'unsplash' || !sessionStorage.getItem('rememberBackground')) {
        sessionStorage.setItem('rememberBackground', 'true');
        await storage.local.set({ backgrounds });
      }
    });
  else bgImage = '';
</script>

<svelte:head>
  {#if $settings.background.startsWith('unsplash')}
    <link rel="preconnect" href="https://images.unsplash.com" />
  {/if}
</svelte:head>

<Settings isOpen={isSettingsOpen} />

<main
  class="bg-gray-100 dark:bg-gray-700 flex-1 relative bg-center bg-cover"
  style:background-image={bgImage ? `url(${bgImage})` : ''}
>
  <button
    on:click={() => (isSettingsOpen = !isSettingsOpen)}
    class="absolute top-2 left-2 opacity-50 hover:opacity-100 transition-opacity"
  >
    <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
      />
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  </button>
  <div class="container flex justify-center items-center flex-col h-full gap-4 p-4">
    {#each $settings.blocks as block (block.id)}
      <svelte:component this={{ topSites: TopSitesBlock, search: SearchBlock }[block.type]} />
    {/each}
  </div>
</main>
