<script setup lang="ts">
import CountryList from "../components/CounryList.vue";
</script>

<template>
  <main class="mt-[10vh]">
    <div id="home-title">
      <h1 class="text-5xl">Welcome to FootballPedia.</h1>
      <p class="text-lg mt-2 mb-[10vh]">
        Access all information about football around the world.
      </p>
    </div>
    <CountryList />
  </main>
</template>
