import type { TWodType } from '@/definitions/enum'

export interface Wod {
  id: number
  title: string
  content: string
  type: TWodType
  wodDate: string
  createdAt: string
  updatedAt: string
}
