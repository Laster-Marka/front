import {Mark} from "../../domain/mark/mark";
import {MarkDto} from "./mark-dto";
import {TagDtoToTagMapper} from "../tag/tag-dto-to-tag-mapper";
import {Tag} from "../../domain/tag/tag";

export class MarkDtoToMarkMapper {
  constructor(
    private readonly tagDtoToTagMapper: TagDtoToTagMapper
  ) {}
  map(markDto: MarkDto): Mark {
    let tags: Tag[] = []
    if(markDto.tags.length !== 0) {
      tags = markDto.tags.map((tag) => {
        return this.tagDtoToTagMapper.map(tag)
      })
    }
    return {
      id: markDto._id,
      title: markDto.title,
      link: markDto.link,
      type: markDto.type[0].name,
      tags: tags,
      description: markDto.description,
      image: markDto.image,
      markdown: markDto.markdown,
      createdAt: markDto.createdAt,
      updatedAt: markDto.updatedAt
    }
  }
}
