import { TagDto } from './tag-dto'
import { Tag } from '../../domain/tag/tag'

export class TagDtoToTagMapper {
  map(tagDto: TagDto): Tag {
    return {
      name: tagDto.name,
    }
  }
}
