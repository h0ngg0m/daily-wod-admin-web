import type { CityType } from '@/definitions/enums'

export interface Box {
  id?: number
  name: string
  description: string
  address: string
  city: CityType
  tel: string
}
