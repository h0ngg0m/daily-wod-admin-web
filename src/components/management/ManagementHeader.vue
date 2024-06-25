<template>
  <v-card variant="tonal" class="d-flex pa-2 bg-grey-darken-4">
    <v-icon v-if="icon" class="mr-2">{{ icon }}</v-icon>
    <span class="text-h6">{{ title }}</span>
    <div class="ml-auto">
      <slot name="add-button"></slot>
    </div>
  </v-card>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  icon?: string
}>()
</script>
