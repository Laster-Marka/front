import {Mark} from "../../domain/mark/mark"
import {TagToTagDtoMapper} from "../tag/tag-to-tag-dto-mapper"
import {TagDto} from "../tag/tag-dto"
import {EditMarkDto} from "./edit-mark-dto"

export class MarkToEditMarkDtoMapper {
  constructor(
    private readonly tagToTagDtoMapper: TagToTagDtoMapper
  ) {}
  map({ title, link, type, tags, description, image, markdown, createdAt, updatedAt }: Mark): EditMarkDto {
    const tagsDto:TagDto[] = tags.map((tag) => {return this.tagToTagDtoMapper.map(tag)})
    return {
      title: title,
      link: link,
      type: type,
      tags: tagsDto,
      description: description,
      image: image,
      markdown: markdown,
      createdAt: createdAt,
      updatedAt: updatedAt
    }
  }
}
