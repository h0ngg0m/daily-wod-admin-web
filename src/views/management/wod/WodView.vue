<template>
  <div class="pa-2 w-100">
    <ManagementHeader title="와드 관리" />
    <ManagementList class="mt-2" />
  </div>
</template>

<script setup lang="ts">
import ManagementHeader from '@/components/management/ManagementHeader.vue'
import ManagementList from '@/views/management/wod/WodList.vue'
</script>
