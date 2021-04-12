import {MarkRepository} from "../../domain/mark-repository";
import {Mark} from "../../domain/mark";
import {inject} from "tsyringe";
import {STORAGE} from "../../../../core/types/types";
import {Folder} from "../../domain/folder";

export class MarkLocalRepository implements MarkRepository {
  constructor(@inject(STORAGE) private readonly storage: Storage) {}

  async findAll(): Promise<Mark[]> {
    const marksString = this.storage.getItem('marks')

    if (marksString === null) {
      return []
    } else {
      const marks: Mark[] = JSON.parse(marksString)
      return marks
    }
  }

  async create(mark: Mark): Promise<void> {
    const marksString = this.storage.getItem('marks')
    if (marksString !== null) {
      let marks: Mark[] = JSON.parse(marksString)
      marks = [...marks, mark]
      this.storage.setItem('marks', JSON.stringify(marks))
    }
  }

  async delete(mark: Mark): Promise<number> {
    const marksString = this.storage.getItem('marks')
    if (marksString !== null) {
      let marks: Mark[] = JSON.parse(marksString)
      const deleteMarkIndex = marks.findIndex(i => i.id === mark.id)
      const isMarkIncluded = deleteMarkIndex !== -1
      if (isMarkIncluded) {
        marks.splice(deleteMarkIndex,1)
        this.storage.setItem('marks', JSON.stringify(marks))
        return 1
      }
      else{
        return 0
      }
    }
    else{
      return 0
    }
  }

  async findFolders(): Promise<Folder[]> {
    const foldersString = this.storage.getItem('folders')

    if (foldersString === null) {
      return []
    } else {
      const folders: Folder[] = JSON.parse(foldersString)
      return folders
    }
  }

  async createFolder(folder: Folder): Promise<void> {
    const folderString = this.storage.getItem('folders')
    if (folderString !== null) {
      let folders: Folder[] = JSON.parse(folderString)
      folders = [...folders, folder]
      this.storage.setItem('folders', JSON.stringify(folders))
    }
  }
}
