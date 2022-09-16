<script lang="ts">
  export let title;
</script>

<details open class="box p-4">
  <summary class=" text-lg">{title}</summary>
  <slot />
</details>
