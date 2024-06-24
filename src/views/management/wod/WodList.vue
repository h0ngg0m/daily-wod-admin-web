<template>
  <v-card variant="tonal" class="d-flex">
    <v-data-table-server
      class="bg-grey-darken-4"
      v-model:page="page"
      v-model:items-per-page="itemsPerPage"
      v-model:sort-by="sortBy"
      :headers="HEADERS"
      :items-length="itemsLength"
      :items="items"
      :loading="loading"
      :items-per-page-options="[10, 30, 50]"
      items-per-page-text=""
    >
      <template #[`item.createdAt`]="{ item }">
        {{ toDatetimeFormat(item.createdAt?.toLocaleString() ?? '-') }}
      </template>
      <template #[`item.updatedAt`]="{ item }">
        {{ toDatetimeFormat(item.updatedAt?.toLocaleString() ?? '-') }}
      </template>
    </v-data-table-server>
  </v-card>
</template>

<script setup lang="ts">
import { stringifyParams, toDatetimeFormat } from '../../../utils/common'
import { ref } from 'vue'
import { watchDebounced } from '@vueuse/core'
import { getApi } from '@/utils/api'
import type { PageResult, SortItem } from '@/definitions/type'
import type { Wod } from '@/definitions/model'

const HEADERS = [
  {
    title: 'ID',
    key: 'id'
  },
  {
    title: '제목',
    key: 'title'
  },
  {
    title: '내용',
    key: 'content'
  },
  {
    title: '타입',
    key: 'type'
  },
  {
    title: '와드 날짜',
    key: 'wodDate'
  },
  {
    title: '생성 일시',
    key: 'createdAt'
  },
  {
    title: '수정 일시',
    key: 'updatedAt'
  }
]

const page = ref(1)
const itemsPerPage = ref(10)
const sortBy = ref<SortItem[]>([{ key: 'id', order: 'desc' }])
const itemsLength = ref(100)
const loading = ref(false)
const items = ref<Wod[]>([])

async function fetchItems(): Promise<void> {
  loading.value = true
  const { data } = await getApi<PageResult<Wod>>(
    `/admin-api/v1/wods?${stringifyParams({
      page: page.value,
      sortDesc: [sortBy.value[0]?.order === 'desc'],
      sortBy: [sortBy.value[0]?.key],
      itemsPerPage: itemsPerPage.value
    })}`
  )
  loading.value = false
  items.value = data.data?.content ?? []
  itemsLength.value = data.data?.page.totalElements ?? 0
}

watchDebounced(() => [page.value, itemsPerPage.value, sortBy.value], fetchItems, {
  debounce: 500,
  immediate: true
})
</script>
