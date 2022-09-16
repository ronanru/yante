<script lang="ts">
  let search = '',
    isOpen = false,
    isAutocompleteRunning = false,
    runAutocompleteAfter = false,
    results = [],
    selectedIndex = -1;

  const getResults = () =>
      search === ''
        ? []
        : fetch(`https://duckduckgo.com/ac/?q=${encodeURIComponent(search)}&kl=wt-wt`)
            .then(r => r.json())
            .then(r => r.map(d => d.phrase)),
    goToResultsPage = s => (location.href = `https://duckduckgo.com/?q=${encodeURIComponent(s)}`),
    autocomplete = async () => {
      if (isAutocompleteRunning) return (runAutocompleteAfter = true);
      isAutocompleteRunning = true;
      results = await getResults();
      selectedIndex = -1;
      setTimeout(() => {
        isAutocompleteRunning = false;
        if (runAutocompleteAfter) autocomplete();
        runAutocompleteAfter = false;
      }, 1000);
    },
    onKeyDown = e => {
      if (!['ArrowUp', 'ArrowDown', 'Enter', 'Escape'].includes(e.code)) return;
      e.preventDefault();
      switch (e.code) {
        case 'Escape':
          isOpen = false;
          break;
        case 'ArrowDown':
        case 'ArrowUp':
          selectedIndex = Math.min(
            Math.max(selectedIndex + (e.code === 'ArrowDown' ? 1 : -1), 0),
            results.length - 1
          );
          search = results[selectedIndex];
          break;
        case 'Enter':
          goToResultsPage(selectedIndex > 0 ? results[selectedIndex] : search);
          break;
      }
    },
    onWindowClick = e => !e.target.closest('.search') && (isOpen = false);
</script>

<svelte:window on:click={onWindowClick} />

<div class="relative search w-full" on:keydown={onKeyDown}>
  <div class="flex items-center box">
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-8 h-8 ml-4"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </svg>
    <input
      on:input={() => setTimeout(autocomplete, 10)}
      on:focus={() => (isOpen = true)}
      bind:value={search}
      type="text"
      placeholder="Search"
      class="flex-1 p-4 text-xl rounded-r-xl bg-transparent outline-none placeholder:text-gray-300"
    />
    {#if search.length}
      <button
        on:click={() => {
          search = '';
          results = [];
        }}
        class="mr-4 text-gray-300 hover:text-current transition-colors"
        title="Clear"
      >
        <svg
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    {/if}
  </div>

  {#if isOpen && results.length}
    <ul role="listbox" tabindex="0" class="absolute left-0 right-0 top-16 box px-4 py-2 m-0">
      {#each results as result, i}
        <li
          on:mouseenter={() => (selectedIndex = i)}
          on:click={() => goToResultsPage(result[selectedIndex])}
          class="rounded-lg cursor-pointer py-2 px-4 text-gray-700 dark:text-gray-100{selectedIndex ===
          i
            ? ' text-black dark:text-white bg-gray-100 dark:bg-gray-400'
            : ''}"
          tabindex="-1"
          role="option"
          aria-selected={selectedIndex === i}
        >
          {result}
        </li>
      {/each}
    </ul>
  {/if}
</div>
