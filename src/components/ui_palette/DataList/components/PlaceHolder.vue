<script setup lang="ts">
import Skeleton from "../../Skeleton.vue";
</script>

<template>
  <Skeleton :width="'150px'" />
  <div
    v-for="(_, idx) in [...Array(2)]"
    :key="`wrapper-skeleton-${idx}`"
    class="mt-[20px] flex flex-col gap-4"
  >
    <Skeleton :width="'50px'" />
    <Skeleton v-for="(_, idx) in [...Array(3)]" :key="`skeleton-${idx}`" />
  </div>
</template>
