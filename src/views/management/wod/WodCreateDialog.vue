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
        <v-form @submit.prevent="submit">
          <v-card-text>
            <v-text-field
              v-model="title.value.value"
              :error-messages="title.errorMessage.value"
              name="title"
              label="제목"
              variant="underlined"
            />
            <v-textarea
              v-model="content.value.value"
              :error-messages="content.errorMessage.value"
              label="내용"
              variant="underlined"
            />
            <v-select
              v-model="type.value.value"
              :error-messages="type.errorMessage.value"
              label="타입"
              variant="underlined"
              :items="Object.values(WodType)"
            />
            <v-date-input
              v-model="wodDate.value.value"
              :error-messages="wodDate.errorMessage.value"
              ok-text="선택 "
              cancel-text="취소 "
              label="와드 날짜 "
              variant="underlined"
            ></v-date-input>
          </v-card-text>
          <v-card-actions class="d-flex justify-end">
            <v-btn variant="flat" @click="isActive.value = false" color="error">
              <v-icon>mdi-cancel</v-icon>
              <span>닫기</span>
            </v-btn>
            <v-btn variant="flat" color="primary" type="submit" :disabled="!meta.valid">
              <v-icon>mdi-plus</v-icon>
              <span>추가</span>
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </template>
  </v-dialog>
</template>
<script setup lang="ts">
import { type TWodType, WodType } from '@/definitions/enum'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { postApi } from '@/utils/api'
import type { Wod, WodCreate } from '@/definitions/model'
import dayjs from 'dayjs'
import { ExceptionCode } from '@/definitions/exception'
import { useNotification } from '@kyvg/vue3-notification'
const { notify } = useNotification()

const emits = defineEmits<{
  (e: 'click'): void
}>()

const schema = yup.object({
  title: yup.string().required('제목은 필수 항목입니다.').label('제목'),
  content: yup.string().required('내용은 필수 항목입니다.').label('내용'),
  type: yup.string().required('타입은 필수 항목입니다.').label('타입'),
  wodDate: yup.date().required('와드 날짜는 필수 항목입니다.').label('와드 날짜')
})

const { handleSubmit, resetForm, meta } = useForm({
  validationSchema: schema
})

const title = useField<string>('title')
const content = useField<string>('content')
const type = useField<TWodType>('type')
const wodDate = useField<string>('wodDate')

const submit = handleSubmit(async () => {
  const response = await postApi<WodCreate, Wod>('/admin-api/v1/wods', {
    title: title.value.value,
    content: content.value.value,
    type: type.value.value,
    wodDate: dayjs(wodDate.value.value).format('YYYY-MM-DD')
  })
  if (response.status === 200 && response.data.code === 'S000') {
    resetForm()
    notify({
      title: '성공',
      text: '와드가 추가되었습니다.'
    })
  } else if (
    response.status === 400 &&
    response.data.code === ExceptionCode.FAIL_DUPLICATED_DATA.code
  ) {
    notify({
      title: '실패',
      text: '이미 존재하는 와드입니다.',
      type: 'error'
    })
  } else {
    notify({
      title: '실패',
      text: '와드 추가에 실패했습니다.',
      type: 'error'
    })
  }
})
</script>
