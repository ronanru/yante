<script lang="ts">
  import Select from './Select.svelte';

  export let blocks;

  let selectedBlock = 'search';

  const blockNames = {
      search: 'Search',
      topSites: 'Top Sites'
    },
    defaultSettings = {
      search: {
        provider: 'DuckDuckGo',
        suggestions: true
      },
      topSites: null
    },
    addBlock = () =>
      (blocks = [
        ...blocks,
        { id: crypto.randomUUID(), type: selectedBlock, settings: defaultSettings[selectedBlock] }
      ]),
    deleteBlock = id => (blocks = blocks.filter(d => id !== d.id)),
    swapBlocks = (i1, i2) =>
      (blocks = blocks.map((d, i) => ([i1, i2].includes(i) ? blocks[i === i1 ? i2 : i1] : d)));
</script>

<h2 class="font-bold text-2xl">Blocks</h2>

<div class="p-4 border border-gray-200 dark:border-gray-400 rounded-lg space-y-2">
  <h3 class="font-bold text-lg">Add Block</h3>
  <Select
    label="Widget Type"
    id="widget"
    options={Object.entries(blockNames).map(([value, name]) => ({ value, name }))}
    bind:value={selectedBlock}
  />
  <button class="bg-gray-200 dark:bg-gray-600 rounded-lg p-2 w-full" on:click={addBlock}>Add</button
  >
</div>
{#each blocks as block, i (block.id)}
  <div class="p-4 border border-gray-200 dark:border-gray-400 rounded-lg space-y-2">
    <div class="flex justify-between items-center w-full">
      <h3 class="font-bold text-lg">{blockNames[block.type]}</h3>
      <div>
        {#if i !== 0}
          <button title="Move Up" on:click={() => swapBlocks(i, i - 1)}>
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          </button>
        {/if}
        {#if i !== blocks.length - 1}
          <button title="Move Down" on:click={() => swapBlocks(i, i + 1)}>
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
        {/if}
        <button title="Delete" on:click={() => deleteBlock(block.id)}>
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </div>
    </div>
    {#if block.type === 'search'}
      <!-- content here -->
    {:else}
      <!-- else content here -->
    {/if}
  </div>
{/each}
