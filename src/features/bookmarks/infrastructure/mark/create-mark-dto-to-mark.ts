import { CreateMarkDto } from './create-mark-dto'
import { Mark } from '../../domain/mark/mark'

export class CreateMarkDtoToMarkMapper {
  map(createMarkDto: CreateMarkDto): Mark {
    return {
      id: (Math.random() * 1000).toString(),
      title: createMarkDto.title,
      link: createMarkDto.link,
      type: createMarkDto.type,
      tags: createMarkDto.tags,
      description: createMarkDto.description,
      image: createMarkDto.image,
      markdown: createMarkDto.markdown,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    }
  }
}
