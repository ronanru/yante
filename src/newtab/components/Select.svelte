<script lang="ts">
  export let label, options, value, id;
</script>

<div class="relative">
  <label for={id}>{label}</label>
  <select
    {id}
    bind:value
    class="peer w-full flex bg-gray-200 dark:bg-gray-600 rounded-lg p-2 appearance-none outline-none"
  >
    {#each options as { value, name }}
      <option {value}>{name}</option>
    {/each}
  </select>
  <svg
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="w-5 h-5 mt-3 mr-2 absolute right-2 bottom-3 pointer-events-none peer-focus:text-red-500"
  >
    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
</div>
