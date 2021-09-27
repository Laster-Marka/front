import {Folder} from "../../domain/folder/folder"
import {EditFolderDto} from "./edit-folder-dto"

export class FolderToEditFolderDtoMapper {
  map({ name, isPublic, color}: Folder): EditFolderDto {
    return {
      name: name,
      isPublic: isPublic,
      color: color
    }
  }
}
