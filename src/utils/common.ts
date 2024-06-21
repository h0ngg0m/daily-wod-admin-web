import { stringify } from 'qs'
import dayjs from 'dayjs'
import { DATETIME_FORMAT_STRING } from '@/definitions/constant'

export function stringifyParams(value: any): string {
  return stringify(value, { arrayFormat: 'comma', skipNulls: true })
}

export function toDatetimeFormat(value: string): string {
  return dayjs(value).isValid() ? dayjs(value).format(DATETIME_FORMAT_STRING) : '-'
}
