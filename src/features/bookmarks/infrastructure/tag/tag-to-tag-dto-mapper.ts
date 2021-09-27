import {TagDto} from "./tag-dto";
import {Tag} from "../../domain/tag/tag";

export class TagToTagDtoMapper {
  map({ name }: Tag): TagDto {
    return {
      _id: (Math.random() * 1000).toString(),
      name: name
    }
  }
}
