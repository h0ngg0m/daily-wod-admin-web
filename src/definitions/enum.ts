export const WodType = {
  METCON: 'METCON',
  CARDIO: 'CARDIO'
}

export type TWodType = (typeof WodType)[keyof typeof WodType]
