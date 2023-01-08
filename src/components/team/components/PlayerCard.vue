<script setup lang="ts">
import { toRef } from "vue";
import { RouterLink } from "vue-router";

import type { SquadType } from "@/types/team";
import { positionMapper } from "../constant";
import { convertDate, convertToAge } from "@/helpers/convertDate";
const props = defineProps<{
  player: SquadType;
}>();

const player = toRef(props, "player");
</script>

<template>
  <RouterLink
    :to="`/player/${player.id}`"
    class="w-full p-2 bg-zinc-600 mb-2 last:mb-0 rounded-md flex gap-3 hover:bg-zinc-50 hover:text-black transition-all duration-500 items-center group"
  >
    <span
      class="text-xl font-bold [writing-mode:vertical-lr]"
      v-if="!!player.position"
      >{{ positionMapper[player.position] }}</span
    >
    <div class="flex-grow text-sm">
      <div class="font-semibold">{{ player.name }}</div>
      <div v-if="player.dateOfBirth">
        {{ convertDate(player.dateOfBirth) }} ({{
          convertToAge(player.dateOfBirth)
        }})
      </div>
      <div>
        {{ player.nationality }}
      </div>
    </div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-10 h-10 group-hover:text-black"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M8.25 4.5l7.5 7.5-7.5 7.5"
      />
    </svg>
  </RouterLink>
</template>
