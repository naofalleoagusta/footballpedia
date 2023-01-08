<script setup lang="ts">
import { toRef } from "vue";
import type { CompetitionType } from "@/types/team";
import { NO_CREST_IMG } from "@/config";
import type { MaybeNull } from "@/types";

const props = defineProps<{
  data: MaybeNull<CompetitionType[]>;
}>();

const runningCompetitions = toRef(props, "data");
</script>
<template>
  <div
    v-if="!!runningCompetitions?.length"
    class="grid grid-cols-2 md:grid-cols-5 gap-2"
  >
    <div
      v-for="competition in runningCompetitions"
      :key="competition.id"
      class="rounded-md bg-zinc-200 p-4 h-fit"
    >
      <img
        v-lazy="competition.emblem || NO_CREST_IMG"
        :alt="`${competition.name} emblem`"
        class="w-full h-auto"
      />
    </div>
  </div>
  <div v-else>
    <span class="text-2xl font-bold"
      >No competition record has been found on this team.</span
    >
  </div>
</template>
