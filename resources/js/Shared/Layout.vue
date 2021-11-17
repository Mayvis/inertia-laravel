<script setup>
import Nav from "./Nav.vue";
</script>

<template>
  <Head>
    <title></title>
    <meta
      type="description"
      content="Information about my laravel inertia"
      head-key="description"
    />
  </Head>

  <Nav></Nav>

  <slot></slot>
</template>

<style lang="scss" scoped></style>
