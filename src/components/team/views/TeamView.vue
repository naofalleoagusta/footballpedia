<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";

import useFetchFootball from "@/hooks/useFetchFootball";

import type { TeamDetailType } from "@/types/team";

const team = ref<TeamDetailType | null>(null);
const isError = ref(false);
const route = useRoute();

onBeforeMount(async () => {
  const { data, error } = await useFetchFootball<TeamDetailType>({
    route: `teams/${route.params.id}`,
  });
  team.value = data.value;
  isError.value = !!error.value;
});
</script>

<template>
  <div v-if="isError">
    <h1>Team not found.</h1>
    <span>Go back, <RouterLink to="/">Home</RouterLink> ?</span>
  </div>
  <div v-if="!team">loading..</div>
  <div v-if="team">
    {{ team.name }}
  </div>
</template>
