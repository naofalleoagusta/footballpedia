<script setup lang="ts">
import { computed, ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";

import DataList from "@/components/ui_palette/DataList/DataList.vue";

import convertToGroupedTeam from "../helpers/convertToGroupedTeam";
import useFetchFootball from "@hooks/useFetchFootball";

import type { ListTeamType, GetListTeamType } from "@/types/team";

const teams = ref<ListTeamType[] | null>(null);
const isError = ref(false);
const route = useRoute();

onBeforeMount(async () => {
  const { data, error } = await useFetchFootball<GetListTeamType>({
    route: `teams?limit=500&areas=${route.params.id}`,
  });
  teams.value =
    data.value?.teams.map((team) => ({ ...team, icon: team.crest })) ?? null;
  isError.value = !!error.value;
});

const groupedTeams = computed(() => convertToGroupedTeam(teams.value));
</script>

<template>
  <DataList
    :datas="groupedTeams"
    :is-error="isError"
    :title="'Team List'"
    :route="`team/`"
    :scroll-threshold="'100px'"
  />
</template>
