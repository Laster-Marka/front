import { Type } from '../../domain/mark/type'
import { TagDto } from '../tag/tag-dto'

export interface EditMarkDto {
  title: string
  link: string
  type: Type
  tags: TagDto[]
  description: string
  image: string
  markdown: string
  createdAt: Date
  updatedAt: Date
}
