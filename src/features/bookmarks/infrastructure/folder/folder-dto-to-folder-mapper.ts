import {FolderDto} from "./folder-dto";
import {Folder} from "../../domain/folder/folder";
import {Mark} from "../../domain/mark/mark";
import {MarkDtoToMarkMapper} from "../mark/mark-dto-to-mark-mapper";

export class FolderDtoToFolderMapper {
  constructor(
    private readonly markDtoToMarkMapper: MarkDtoToMarkMapper
  ) {}
  map(folderDto: FolderDto): Folder {
    let marks: Mark[] = []
    if(folderDto.marks !== undefined && folderDto.marks.length !== 0) {
      marks = folderDto.marks.map((mark) => {
        return this.markDtoToMarkMapper.map(mark)
      })
    }
    return {
      id: folderDto._id,
      name: folderDto.name,
      marks: marks,
      isPublic: folderDto.isPublic,
      color: folderDto.color,
      createdAt: new Date(folderDto.createdAt),
      updatedAt: new Date(folderDto.updatedAt)
    }
  }
}
