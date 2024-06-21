<template>
  <v-btn @click="emits('click')" color="primary">
    <v-icon>mdi-plus</v-icon>
    <span>추가</span>
  </v-btn>
</template>
<script setup lang="ts">
const emits = defineEmits<{
  (e: 'click'): void
}>()
</script>
