import { MarkRepository } from '../../domain/mark/mark-repository'
import { MarkHttpRepository } from './mark-http-repository'
import { MarkDtoToMarkMapper } from './mark-dto-to-mark-mapper'
import { MarkToMarkDtoMapper } from './mark-to-mark-dto-mapper'
import { MarkLocalRepository } from './mark-local-repository'
import { TagDtoToTagMapper } from '../tag/tag-dto-to-tag-mapper'
import { TagToTagDtoMapper } from '../tag/tag-to-tag-dto-mapper'
import { CreateMarkDtoToMarkMapper } from './create-mark-dto-to-mark'
import { FolderDtoToFolderMapper } from '../folder/folder-dto-to-folder-mapper'
import { FolderToFolderDtoMapper } from '../folder/folder-to-folder-dto-mapper'
import { CreateFolderDtoToFolderMapper } from '../folder/create-folder-dto-to-folder'
import { MarkToEditMarkDtoMapper } from './mark-to-edit-mark-dto'
import { FolderToEditFolderDtoMapper } from '../folder/folder-to-edit-folder-dto-mapper'

export class MarkRepositoryFactory {
  static build(): MarkRepository {
    return new MarkHttpRepository(
      new MarkToEditMarkDtoMapper(new TagToTagDtoMapper()),
      new FolderToEditFolderDtoMapper(),
      new FolderDtoToFolderMapper(new MarkDtoToMarkMapper(new TagDtoToTagMapper())),
    )
  }
  static buildLocal(): MarkRepository {
    return new MarkLocalRepository(
      localStorage,
      new FolderDtoToFolderMapper(new MarkDtoToMarkMapper(new TagDtoToTagMapper())),
      new FolderToFolderDtoMapper(new MarkToMarkDtoMapper(new TagToTagDtoMapper())),
      new CreateFolderDtoToFolderMapper(),
      new CreateMarkDtoToMarkMapper(),
    )
  }
}
