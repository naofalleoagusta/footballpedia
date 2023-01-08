<script setup lang="ts">
import TitleHeader from "@/components/ui_palette/TitleHeader.vue";
import CountryList from "../components/CountryList.vue";

import useTitle from "@/hooks/useTitle";
import { onMounted } from "vue";

const title = useTitle();

onMounted(() => {
  title.value = "Home | Footballpedia";
});
</script>

<template>
  <main class="pt-[5vh] list-container">
    <TitleHeader
      :title="'Welcome to FootballPedia.'"
      :subtitle="'Access all information about football around the world.'"
    />
    <CountryList />
  </main>
</template>
