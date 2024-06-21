<template>
  <v-list :lines="false" density="compact" :nav="true">
    <v-list-item
      v-for="(item, i) in items"
      :key="i"
      :value="item"
      color="bg-grey-darken-1"
      @click="router.push(item.to)"
    >
      <template v-slot:prepend>
        <v-icon :icon="item.icon"></v-icon>
      </template>

      <v-list-item-title v-text="item.title"></v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script setup lang="ts">
import type { Menu } from '@/definitions/type'
import router from '@/router'

const items: Menu[] = [
  {
    title: '와드 관리',
    icon: 'mdi-weight-lifter',
    to: '/management/wod'
  },
  {
    title: '회원 관리',
    icon: 'mdi-account-outline',
    to: '/management/user'
  }
]
</script>
