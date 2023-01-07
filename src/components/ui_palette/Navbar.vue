<script lang="ts" setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <header class="fixed w-full h-[70px]">
    <nav
      class="flex justify-between max-w-screen-md mx-auto h-full items-center px-4 lg:p-0"
    >
      <RouterLink to="/" class="font-roboto-slap text-zinc-200 text-xl">
        FootballPedia
      </RouterLink>
    </nav>
  </header>
</template>
