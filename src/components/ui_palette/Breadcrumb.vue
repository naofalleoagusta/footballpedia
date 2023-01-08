<script setup lang="ts">
import { toRefs } from "vue";
import { RouterLink } from "vue-router";

import type { BreadcrumbType } from "@/types";

const props = defineProps<{
  breadcrumbs: BreadcrumbType[];
}>();

const { breadcrumbs } = toRefs(props);
</script>
<template>
  <span class="flex gap-2 mb-4">
    <span v-for="dtBreadcrumb in breadcrumbs" :key="dtBreadcrumb.text">
      <RouterLink
        :to="dtBreadcrumb.route"
        class="text-zinc-400 hover:text-zinc-200"
      >
        {{ dtBreadcrumb.text }}
      </RouterLink>
      <span class="pl-2 text-zinc-500">/</span>
    </span>
  </span>
</template>
