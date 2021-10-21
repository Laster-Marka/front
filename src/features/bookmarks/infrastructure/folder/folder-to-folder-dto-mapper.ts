import { MarkToMarkDtoMapper } from '../mark/mark-to-mark-dto-mapper'
import { MarkDto } from '../mark/mark-dto'
import { Folder } from '../../domain/folder/folder'
import { FolderDto } from './folder-dto'

export class FolderToFolderDtoMapper {
  constructor(private readonly markToMarkDtoMapper: MarkToMarkDtoMapper) {}
  map({ id, name, marks, isPublic, color, createdAt, updatedAt }: Folder): FolderDto {
    const marksDto: MarkDto[] = marks.map(mark => {
      return this.markToMarkDtoMapper.map(mark)
    })
    return {
      _id: id,
      name: name,
      marks: marksDto,
      isPublic: isPublic,
      color: color,
      createdAt: createdAt,
      updatedAt: updatedAt,
    }
  }
}
