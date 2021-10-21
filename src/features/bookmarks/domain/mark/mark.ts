import { Tag } from '../tag/tag'
import { Type } from './type'

export interface Mark {
  id: string
  title: string
  link: string
  type: Type
  tags: Tag[]
  description: string
  image: string
  markdown: string
  createdAt: Date
  updatedAt: Date
}
