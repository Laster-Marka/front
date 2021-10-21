import { TypeObj } from '../../domain/mark/type'
import { TagDto } from '../tag/tag-dto'

export interface MarkDto {
  _id: string
  title: string
  link: string
  type: TypeObj[]
  tags: TagDto[]
  description: string
  image: string
  markdown: string
  createdAt: Date
  updatedAt: Date
}
