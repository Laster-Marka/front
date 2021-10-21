import { CreateFolderDto } from './create-folder-dto'
import { Folder } from '../../domain/folder/folder'

export class CreateFolderDtoToFolderMapper {
  map(createFolderDto: CreateFolderDto): Folder {
    return {
      id: (Math.random() * 1000).toString(),
      name: createFolderDto.name,
      marks: [],
      isPublic: createFolderDto.isPublic,
      color: createFolderDto.color,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    }
  }
}
