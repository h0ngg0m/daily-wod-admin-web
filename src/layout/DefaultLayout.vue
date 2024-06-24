<template>
  <v-app-bar title="Daily WOD 관리자" class="bg-grey-darken-4">
    <template #append>
      <v-btn @click="logout" icon="mdi-logout"></v-btn>
    </template>
  </v-app-bar>

  <v-navigation-drawer :permanent="true" width="200" class="bg-grey-darken-4">
    <LeftNav />
  </v-navigation-drawer>

  <v-main class="d-flex w-100" style="min-height: 300px">
    <slot />
  </v-main>
</template>
<script setup lang="ts">
import LeftNav from '@/layout/nav/LeftNav.vue'
import { useAdminStore } from '@/stores/admin'

const { logout } = useAdminStore()
</script>
