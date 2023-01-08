<script setup lang="ts">
import Skeleton from "@/components/ui_palette/Skeleton.vue";
</script>

<template>
  <div class="flex gap-5 mt-[40px]">
    <div class="w-[60px] h-[60px] sm:w-[100px] sm:h-[100px] flex-shrink-0">
      <Skeleton heigth="100%" />
    </div>
    <div class="flex-grow flex flex-col gap-1">
      <Skeleton width="200px" heigth="30px" />
      <Skeleton
        v-for="(_, idx) in [...Array(3)]"
        :key="`skeleton-${idx}`"
        width="100px"
        heigth="20px"
      />
    </div>
  </div>
  <div class="flex gap-5 mt-[20px]">
    <Skeleton
      v-for="(_, idx) in [...Array(3)]"
      :key="`tab-skeleton-${idx}`"
      heigth="50px"
    />
  </div>

  <div class="flex-grow flex flex-col gap-5 mt-5">
    <Skeleton
      v-for="(_, idx) in [...Array(5)]"
      :key="`skeleton-player-${idx}`"
    />
  </div>
</template>
