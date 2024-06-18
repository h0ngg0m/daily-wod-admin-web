import { City } from '@/definitions/enums'
import type { Boxes } from '@/definitions/type'

export function defaultBoxes(): Boxes {
  const defaultBoxes: Boxes = {}
  Object.values(City).forEach((city) => (defaultBoxes[city] = []))
  return defaultBoxes
}
