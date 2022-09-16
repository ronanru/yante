<script lang="ts">
  import BlockEditor from './BlockEditor.svelte';
  import { cubicInOut } from 'svelte/easing';
  import Select from './Select.svelte';
  import settings from '../settings';

  export let isOpen;

  const scale = _node => ({
    delay: 0,
    duration: 400,
    easing: cubicInOut,
    css: t =>
      `transform: scaleX(${t}); width: ${Math.floor(t * 384)}px; padding-inline: ${Math.floor(
        t * 16
      )}px`
  });
</script>

{#if isOpen}
  <aside
    class="bg-gray-50 dark:bg-gray-800 space-y-4 w-96 p-4 border-r-2 border-gray-200 dark:border-gray-400 shadow-md"
    transition:scale
  >
    <h1 class="font-bold text-3xl">Settings</h1>
    <Select
      label="Theme"
      id="theme"
      options={[
        { value: 'light', name: 'Light' },
        { value: 'dark', name: 'Dark' }
      ]}
      bind:value={$settings.theme}
    />
    <Select
      label="Background"
      id="background"
      options={[
        { value: 'default', name: 'Default' },
        { value: 'unsplash', name: 'Unsplash' },
        { value: 'unsplash-remember', name: 'Unsplash (Remember image)' }
      ]}
      bind:value={$settings.background}
    />
    <BlockEditor bind:blocks={$settings.blocks} />
  </aside>
{/if}
