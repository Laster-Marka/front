import {Tag} from "../../domain/tag/tag";
import {Type} from "../../domain/mark/type";

export interface CreateMarkDto {
  title: string
  link: string
  type: Type
  tags: Tag[]
  description: string
  image: string
  markdown: string
}
