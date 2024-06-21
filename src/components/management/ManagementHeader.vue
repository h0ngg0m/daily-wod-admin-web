<template>
  <v-card variant="tonal" class="d-flex pa-2">
    <span class="text-h6">{{ title }}</span>
    <AddButton class="ml-auto" @click="clickAddButton" />
  </v-card>
</template>

<script setup lang="ts">
import AddButton from '@/components/AddButton.vue'

defineProps<{
  title: string
}>()

function clickAddButton() {
  console.log('click')
}
</script>
