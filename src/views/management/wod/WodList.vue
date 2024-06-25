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
      <template #[`item.actions`]="{ item }">
        <v-btn variant="flat" color="error" @click="deleteWod(item)">
          <v-icon>mdi-trash-can-outline</v-icon>
          <span>삭제</span>
        </v-btn>
      </template>
    </v-data-table-server>
  </v-card>
</template>

<script setup lang="ts">
import { stringifyParams, toDatetimeFormat } from '@/utils/common'
import { ref } from 'vue'
import { watchDebounced } from '@vueuse/core'
import { deleteApi, getApi } from '@/utils/api'
import type { PageResult, SortItem } from '@/definitions/type'
import type { Wod } from '@/definitions/model'
import { useNotification } from '@kyvg/vue3-notification'
const { notify } = useNotification()

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
  },
  {
    title: '관리',
    key: 'actions'
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

async function deleteWod(wod: Wod): Promise<void> {
  if (confirm('와드를 삭제하시겠습니까?')) {
    const response = await deleteApi(`/admin-api/v1/wods/${wod.id}`)
    if (response.status === 204) {
      notify({
        title: '성공',
        text: '와드가 삭제되었습니다.'
      })
      await fetchItems()
    }
  }
}
watchDebounced(() => [page.value, itemsPerPage.value, sortBy.value], fetchItems, {
  debounce: 500,
  immediate: true
})
</script>
