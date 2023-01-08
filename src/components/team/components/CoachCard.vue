<script setup lang="ts">
import { toRef } from "vue";

import { convertDate, convertToAge } from "@/helpers/convertDate";
import convertContract from "@/components/player/helpers/convertContract";

import type { CoachType } from "@/types/team";

const props = defineProps<{
  data: CoachType;
}>();

const coach = toRef(props, "data");
</script>
<template>
  <div v-if="!!coach.id">
    <div class="text-2xl font-bold">{{ coach.name }}</div>
    <div class="text-sm" v-if="!!coach.firstName || !!coach.lastName">
      {{ coach.firstName || "" }}{{ coach.lastName || "" }}
    </div>
    <div v-if="coach.nationality">
      {{ coach.nationality }}
    </div>

    <div v-if="coach.dateOfBirth">
      <p>{{ convertDate(coach.dateOfBirth) }}</p>
      <p>{{ convertToAge(coach.dateOfBirth) }} years old</p>
    </div>

    <div v-if="coach.contract.start || coach.contract.until">
      <span
        >{{ convertContract(coach.contract.start) }} -
        {{ convertContract(coach.contract.until) }}</span
      >
    </div>
  </div>
  <span class="text-2xl font-bold" v-else>No coach record found.</span>
</template>
