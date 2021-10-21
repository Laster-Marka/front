import { Folder } from '../features/bookmarks/domain/folder/folder'
import { MarkMother } from './mark-mother'

export class FolderMother {
  static pokemon(): Folder {
    return {
      id: '1',
      color: '',
      isPublic: false,
      marks: [MarkMother.bestPokemon()],
      name: 'Pokemon',
      createdAt: new Date('2019-01-17'),
      updatedAt: new Date('2019-01-30'),
    }
  }
  static answers(): Folder {
    return {
      id: '2',
      color: '',
      isPublic: false,
      marks: [MarkMother.markdownVim(), MarkMother.textYahoo()],
      name: 'Answers',
      createdAt: new Date('2019-01-17'),
      updatedAt: new Date('2019-01-30'),
    }
  }
}
