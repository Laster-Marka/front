import {Type} from "../../domain/type";

export interface MarkDto {
  userId: number
  id: number
  folder: number
  title: string
  link: string
  type: Type
  tags: string[]
  description: string
  date: Date
}
