<template>
  <v-app class="bg-black">
    <component :is="currentLayout" v-if="isRouterLoaded">
      <RouterView />
    </component>
    <Notifications position="bottom left" />
  </v-app>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import DefaultLayout from '@/layout/DefaultLayout.vue'
import AuthLayout from '@/layout/AuthLayout.vue'
import '@/fonts/SpoqaHanSansNeo.css'
import ErrorLayout from '@/layout/ErrorLayout.vue'
import { Notifications } from '@kyvg/vue3-notification'

const route = useRoute()
const layouts = {
  default: DefaultLayout,
  auth: AuthLayout,
  error: ErrorLayout
}

const isRouterLoaded = computed((): boolean => route.name !== null)
const currentLayout = computed(() => layouts[route.meta?.layout || 'default'])
</script>
<style lang="scss">
body {
  font-family: 'Spoqa Han Sans Neo', sans-serif;
}
</style>
