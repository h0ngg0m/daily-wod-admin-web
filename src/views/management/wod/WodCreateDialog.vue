<template>
  <v-dialog max-width="500">
    <template #activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" @click="emits('click')" color="primary">
        <v-icon>mdi-plus</v-icon>
        <span>추가</span>
      </v-btn>
    </template>

    <template #default="{ isActive }">
      <v-card title="와드 추가" class="bg-grey-darken-3">
        <v-card-text>
          <v-text-field label="제목" variant="underlined" />
          <v-textarea label="내용" variant="underlined" />
          <v-select label="타입" variant="underlined" :items="Object.values(WodType)" />
          <v-date-input
            ok-text="선택"
            cancel-text="취소"
            label="와드 날짜"
            variant="underlined"
          ></v-date-input>
        </v-card-text>
        <v-card-actions>
          <v-btn variant="flat" @click="isActive.value = false" color="error">
            <v-icon>mdi-cancel</v-icon>
            <span>닫기</span>
          </v-btn>
          <v-btn variant="flat" color="primary">
            <v-icon>mdi-plus</v-icon>
            <span>추가</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script setup lang="ts">
import { WodType } from '@/definitions/enum'

const emits = defineEmits<{
  (e: 'click'): void
}>()
</script>
