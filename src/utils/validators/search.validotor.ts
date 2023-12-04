import { InferType, object, string } from 'yup'

export const searchSchema = object({
  keyword: string().required(),
})
export type SearchSchema = InferType<typeof searchSchema>
