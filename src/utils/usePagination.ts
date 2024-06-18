import { ref } from 'vue'
import type { PageParams } from '@/definitions/type'

export default function (
  pageParams: PageParams = {
    page: 1,
    size: 10
  }
) {
  const _pageParams = ref(pageParams)

  return {
    pageParams: _pageParams
  }
}
