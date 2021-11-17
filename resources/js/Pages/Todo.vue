<script setup>
import { usePage } from "@inertiajs/inertia-vue3"; // https://github.com/inertiajs/inertia/discussions/781#discussioncomment-956629

defineProps({
  todos: Array,
});

console.log(usePage().component.value);
console.log(usePage().props.value);
</script>

<template>
  <Head>
    <title>Todo</title>
    <meta
      type="description"
      content="Information about my todo page"
      head-key="description"
    />
  </Head>

  <h1>Todo page</h1>
  <ul>
    <li v-for="(todo, index) in todos" :key="index">{{ todo }}</li>
  </ul>
</template>

<style lang="scss" scoped></style>
