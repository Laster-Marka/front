import { Mark } from '../../domain/mark/mark'
import { MarkDto } from './mark-dto'
import { TagToTagDtoMapper } from '../tag/tag-to-tag-dto-mapper'
import { TagDto } from '../tag/tag-dto'
import { TypeObj } from '../../domain/mark/type'

export class MarkToMarkDtoMapper {
  constructor(private readonly tagToTagDtoMapper: TagToTagDtoMapper) {}
  map({
    id,
    title,
    link,
    type,
    tags,
    description,
    image,
    markdown,
    createdAt,
    updatedAt,
  }: Mark): MarkDto {
    const tagsDto: TagDto[] = tags.map(tag => {
      return this.tagToTagDtoMapper.map(tag)
    })
    const typeObj: TypeObj = { name: type }
    return {
      _id: id,
      title: title,
      link: link,
      type: [typeObj],
      tags: tagsDto,
      description: description,
      image: image,
      markdown: markdown,
      createdAt: createdAt,
      updatedAt: updatedAt,
    }
  }
}
