<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";

import useFetchFootball from "@/hooks/useFetchFootball";
import shortenedPosition from "./helpers/shortenedPosition";

import type { PlayerType } from "@/types/player";
import { convertDate, convertToAge } from "@/helpers/convertDate";
import { NO_CREST_IMG } from "@/config";
import convertContract from "./helpers/convertContract";

const player = ref<PlayerType | null>(null);
const isError = ref(false);
const route = useRoute();

onBeforeMount(async () => {
  const { data, error } = await useFetchFootball<PlayerType>({
    route: `persons/${route.params.id}`,
  });
  player.value = data.value;
  isError.value = !!error.value;
});
</script>
<template>
  <div v-if="isError">
    <h1>Player not found.</h1>
    <span>Go back, <RouterLink to="/">Home</RouterLink> ?</span>
  </div>
  <div v-if="!player && !isError">loading..</div>
  <div v-if="player">
    <div class="pt-[20px] w-full flex gap-2">
      <div class="h-max flex flex-col items-center">
        <span
          class="[writing-mode:vertical-lr] font-bold text-4xl sm:text-5xl text-gray-50 opacity-25 flex items-center"
          v-if="player.position"
        >
          {{ shortenedPosition(player.position) }}
        </span>
        <div
          class="text-bold text-2xl sm:text-4xl text-center"
          v-if="player.shirtNumber"
        >
          #{{ player.shirtNumber }}
        </div>
      </div>
      <div class="flex-grow">
        <h1 class="text-2xl sm:text-5xl font-bold">{{ player.name || "" }}</h1>
        <h2 v-if="player.firstName || player.lastName">
          {{ player.firstName || "" }} {{ player.lastName || "" }}
        </h2>
        <div class="text-lg">
          <div v-if="player.nationality">
            {{ player.nationality }}
          </div>
          <div v-if="player.dateOfBirth">
            <div>{{ convertDate(player.dateOfBirth) }}</div>
            <div>{{ convertToAge(player.dateOfBirth) }} years old.</div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-[40px]">
      <h2 class="text-3xl text-bold underline">Current Team</h2>
      <div class="w-full rounded-lg bg-zinc-800 mt-[20px] p-4">
        <div class="flex gap-4">
          <div class="flex-shrink-0">
            <img
              v-lazy="player?.currentTeam?.crest || NO_CREST_IMG"
              :alt="`${player?.currentTeam?.name || 'Free Agent'} Logo`"
              class="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px]"
            />
          </div>
          <div class="flex-grow">
            <div class="flex items-baseline md:items-center gap-2">
              <RouterLink
                v-if="player?.currentTeam?.id"
                :to="`/team/${player.currentTeam.area.id}`"
                class="underline text-2xl"
              >
                <h3>
                  {{ player.currentTeam.name }}
                </h3>
              </RouterLink>
              <h3 class="underline text-2xl" v-else>
                {{ player?.currentTeam?.name || "Free Agent" }}
              </h3>

              <RouterLink
                v-if="player?.currentTeam?.area.id"
                :to="`/area/${player.currentTeam.area.id}`"
                class="flex-shrink-0"
              >
                <img
                  v-lazy="player.currentTeam.area.flag"
                  :alt="`${player.currentTeam.area.name} flag`"
                  class="w-[20px] h-[20px]"
                />
              </RouterLink>
            </div>
            <div
              v-if="
                player.currentTeam?.contract?.start ||
                player.currentTeam?.contract?.until
              "
            >
              <p>Contract:</p>
              <span
                >{{ convertContract(player.currentTeam?.contract?.start) }} -
                {{ convertContract(player.currentTeam?.contract?.until) }}</span
              >
            </div>
          </div>
        </div>
        <div
          v-if="player.currentTeam?.runningCompetitions"
          class="flex mt-[20px] gap-5"
        >
          <h3 class="text-2xl font-bold md:text-4xl [writing-mode:vertical-lr]">
            Competition
          </h3>
          <div class="grid grid-cols-2 md:grid-cols-5 gap-2">
            <div
              v-for="competition in player.currentTeam.runningCompetitions"
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
        </div>
      </div>
    </div>
  </div>
</template>
