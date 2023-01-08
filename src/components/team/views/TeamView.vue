<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";

import PlayerList from "../components/PlayerList.vue";
import CoachCard from "../components/CoachCard.vue";
import CompetitionList from "../components/CompetitionList.vue";
import PlaceHolder from "../components/PlaceHolder.vue";
import PageNotFound from "@/components/ui_palette/PageNotFound.vue";
import Breadcrumb from "@/components/ui_palette/Breadcrumb.vue";

import useFetchFootball from "@/hooks/useFetchFootball";
import useTitle from "@/hooks/useTitle";

import { NO_CREST_IMG } from "@/config";
import { tabList } from "../constant";
import { INITIAL_VALUE_BREADCRUMBS } from "@/constant/breadcrumb";

import type { BreadcrumbType } from "@/types";
import type { TeamDetailType } from "@/types/team";

const team = ref<TeamDetailType | null>(null);
const isError = ref(false);
const route = useRoute();
const selectedTab = ref(0);
const tabs = ref(tabList);
const breadcrumbs = ref<BreadcrumbType[]>(INITIAL_VALUE_BREADCRUMBS);
const title = useTitle();

const changeTab = (index: number) => {
  selectedTab.value = index;
};

const getComponentToRender = (param: string) => {
  switch (param) {
    case "Players":
      return PlayerList;
    case "Coach":
      return CoachCard;
    default:
      return CompetitionList;
  }
};

onBeforeMount(async () => {
  const { data, error } = await useFetchFootball<TeamDetailType>({
    route: `teams/${route.params.id}`,
  });
  team.value = data.value;
  isError.value = !!error.value;
  breadcrumbs.value = [
    ...breadcrumbs.value,
    {
      route: data.value?.area.id ? `/area/${data.value?.area.id}` : "/",
      text: data.value?.area.name || "Area",
    },
  ];
  title.value = `${data.value?.name || "Team"} | Footballpedia`;
});
</script>

<template>
  <PageNotFound v-if="isError" text="Team" />
  <PlaceHolder v-if="!team && !isError" />
  <div v-if="team" class="pt-[20px]">
    <Breadcrumb :breadcrumbs="breadcrumbs" />
    <div class="flex items-center gap-5">
      <img
        v-lazy="team.crest || NO_CREST_IMG"
        :src="`${team.name}'s crest'`"
        class="w-[60px] h-[60px] sm:w-[100px] sm:h-[100px] flex-shrink-0"
      />
      <div class="flex-grow break-words">
        <div class="flex items-center gap-4">
          <h1 class="text-2xl md:text-3xl">{{ team.name }}</h1>
          <RouterLink :to="`/area/${team.area.id}`">
            <img
              v-lazy="team.area.flag || NO_CREST_IMG"
              class="w-5 h-5"
              :alt="`${team.area.name} flag`"
            />
          </RouterLink>
        </div>
        <div class="flex flex-col text-sm">
          <span v-if="team.founded"
            >Founded <time>{{ team.founded }}</time></span
          >
          <span v-if="team.venue" class="">
            {{ team.venue }}
          </span>
          <span v-if="team.address" class="">
            {{ team.address }}
          </span>
          <a
            v-if="team.website"
            :href="team.website"
            class="text-zinc-400 hover:text-zinc-200 duration-300 transition-colors break-all"
            >{{ team.website }}</a
          >
        </div>
      </div>
    </div>
    <TabGroup :selectedIndex="selectedTab" @change="changeTab">
      <TabList class="flex space-x-1 rounded-xl bg-zinc-800 p-1 mt-5">
        <Tab v-for="tab in tabs" as="template" :key="tab" v-slot="{ selected }">
          <button
            :class="[
              'w-full rounded-lg py-2.5 text-md font-medium leading-5 text-zinc-200 transition-all duration-300',
              'outline-none',
              selected
                ? 'bg-zinc-600 shadow font-bold'
                : 'text-zinc-400 hover:bg-white hover:text-slate-900',
            ]"
          >
            {{ tab }}
          </button>
        </Tab>
      </TabList>

      <TabPanels class="mt-2">
        <TabPanel
          v-for="(tab, idx) in tabs"
          :key="`${tab}${idx}`"
          :class="['rounded-xl bg-zinc-800 p-3 outline-none flex gap-2']"
        >
          <h2 class="text-2xl font-bold md:text-4xl [writing-mode:vertical-lr]">
            {{ tab }}
          </h2>
          <div class="flex-grow">
            <component
              v-bind:is="getComponentToRender(tab)"
              v-bind:data="
                tab === 'Players'
                  ? team.squad
                  : tab === 'Coach'
                  ? team.coach
                  : team.runningCompetitions
              "
            />
          </div>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>
