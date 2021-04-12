import {Mark} from "../../domain/mark";
import {MarkDto} from "./mark-dto";

export class MarkDtoToMarkMapper {
  map(todoDto: MarkDto): Mark {
    return {
      id: todoDto.id,
      folder: todoDto.folder,
      title: todoDto.title,
      link: todoDto.link,
      type: todoDto.type,
      tags: todoDto.tags,
      description: todoDto.description,
      createdAt: todoDto.createdAt,
      updatedAt: todoDto.updatedAt
    }
  }
}
