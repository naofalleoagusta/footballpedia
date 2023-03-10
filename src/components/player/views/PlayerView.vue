<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";

import PageNotFound from "@/components/ui_palette/PageNotFound.vue";
import PlaceHolder from "@/components/team/components/PlaceHolder.vue";
import CompetitionList from "@/components/team/components/CompetitionList.vue";
import Breadcrumb from "@/components/ui_palette/Breadcrumb.vue";

import useFetchFootball from "@/hooks/useFetchFootball";
import shortenedPosition from "../helpers/shortenedPosition";
import convertContract from "../helpers/convertContract";
import { convertDate, convertToAge } from "@/helpers/convertDate";
import useTitle from "@/hooks/useTitle";

import { NO_CREST_IMG } from "@/config";
import { INITIAL_VALUE_BREADCRUMBS } from "@/constant/breadcrumb";

import type { BreadcrumbType } from "@/types";
import type { PlayerType } from "@/types/player";

const player = ref<PlayerType | null>(null);
const isError = ref(false);
const breadcrumbs = ref<BreadcrumbType[]>(INITIAL_VALUE_BREADCRUMBS);
const route = useRoute();
const title = useTitle();

onBeforeMount(async () => {
  const { data, error } = await useFetchFootball<PlayerType>({
    route: `persons/${route.params.id}`,
  });
  player.value = data.value;
  isError.value = !!error.value;
  breadcrumbs.value = [
    ...breadcrumbs.value,
    {
      route: data.value?.currentTeam?.area.id
        ? `/area/${data.value?.currentTeam?.area.id}`
        : "/",
      text: data.value?.currentTeam?.area.name || "Area",
    },
    {
      route: data.value?.currentTeam?.id
        ? `/team/${data.value?.currentTeam?.id}`
        : "/",
      text: data.value?.currentTeam?.name || "Team",
    },
  ];
  title.value = `${data.value?.name || "Player"} | Footballpedia`;
});
</script>
<template>
  <PageNotFound v-if="isError" text="Player" />
  <PlaceHolder v-if="!player && !isError" />
  <div v-if="player">
    <Breadcrumb :breadcrumbs="breadcrumbs" />
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
                :to="`/team/${player.currentTeam.id}`"
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
                  v-if="player.currentTeam.area.flag"
                  :src="player.currentTeam.area.flag"
                  :srcset="player.currentTeam.area.flag"
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
              <span
                >{{ convertContract(player.currentTeam?.contract?.start) }} -
                {{ convertContract(player.currentTeam?.contract?.until) }}</span
              >
            </div>
          </div>
        </div>
        <div class="flex mt-[20px] gap-5">
          <h3 class="text-2xl font-bold md:text-4xl [writing-mode:vertical-lr]">
            Competition
          </h3>
          <CompetitionList
            :data="player.currentTeam?.runningCompetitions ?? null"
          />
        </div>
      </div>
    </div>
  </div>
</template>
