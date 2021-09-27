import {MarkRepository} from "../../domain/mark/mark-repository";
import {Mark} from "../../domain/mark/mark";
import {inject} from "tsyringe";
import {STORAGE} from "../../../../core/types/types";
import {Folder} from "../../domain/folder/folder";
import {FoldersContent} from "../folder/folders-content";
import {CreateMarkDto} from "./create-mark-dto";
import {CreateMarkDtoToMarkMapper} from "./create-mark-dto-to-mark";
import {FolderDtoToFolderMapper} from "../folder/folder-dto-to-folder-mapper";
import {FolderToFolderDtoMapper} from "../folder/folder-to-folder-dto-mapper";
import {CreateFolderDto} from "../folder/create-folder-dto";
import {CreateFolderDtoToFolderMapper} from "../folder/create-folder-dto-to-folder";

export class MarkLocalRepository implements MarkRepository {
  constructor(@inject(STORAGE) private readonly storage: Storage,
              private readonly folderDtoToFolderMapper: FolderDtoToFolderMapper,
              private readonly folderToFolderDtoMapper: FolderToFolderDtoMapper,
              private readonly createFolderDtoToFolderMapper: CreateFolderDtoToFolderMapper,
              private readonly createMarkDtoToMarkMapper: CreateMarkDtoToMarkMapper) {}

  async findAll(): Promise<Folder[]> {
    const foldersString = this.storage.getItem('folders')

    if (foldersString === null) {
      return []
    } else {
      let foldersContent: FoldersContent = JSON.parse(foldersString)
      //TODO:folderMapper
      const folders: Folder[] = foldersContent.folders.map((folder) => {return this.folderDtoToFolderMapper.map(folder)})
      return folders
    }
  }

  async create(createMarkDto: CreateMarkDto, idFolder: string): Promise<any> {
    const foldersString = this.storage.getItem('folders')
    if (foldersString !== null) {
      let foldersContent: FoldersContent = JSON.parse(foldersString)
      const folders: Folder[] = foldersContent.folders.map((folder) => {return this.folderDtoToFolderMapper.map(folder)})
      const markFolderIndex = folders.findIndex(i => i.id === idFolder)
      const mark: Mark = this.createMarkDtoToMarkMapper.map(createMarkDto)
      folders[markFolderIndex].marks.push(mark)
      foldersContent.folders = folders.map((folder) => {return this.folderToFolderDtoMapper.map(folder)})
      this.storage.setItem('folders', JSON.stringify(foldersContent))
      return mark
    }
    return null
  }

  async edit(mark: Mark, idFolder: string): Promise<any> {
    const foldersString = this.storage.getItem('folders')
    if (foldersString !== null) {
      let foldersContent: FoldersContent = JSON.parse(foldersString)
      const folders: Folder[] = foldersContent.folders.map((folder) => {return this.folderDtoToFolderMapper.map(folder)})
      const markFolderIndex = folders.findIndex(i => i.id === idFolder)
      const editMarkIndex = folders[markFolderIndex].marks.findIndex(i => i.id === mark.id)
      const isMarkIncluded = editMarkIndex !== -1
      if (isMarkIncluded) {
        folders[markFolderIndex].marks[editMarkIndex].title = mark.title
        folders[markFolderIndex].marks[editMarkIndex].type = mark.type
        folders[markFolderIndex].marks[editMarkIndex].link = mark.link
        folders[markFolderIndex].marks[editMarkIndex].description = mark.description
        folders[markFolderIndex].marks[editMarkIndex].tags = mark.tags
        foldersContent.folders = folders.map((folder) => {return this.folderToFolderDtoMapper.map(folder)})
        this.storage.setItem('folders', JSON.stringify(foldersContent))
      }
    }
  }

  async delete(mark: Mark, idFolder: string): Promise<any> {
    const foldersString = this.storage.getItem('folders')
    if (foldersString !== null) {
      let foldersContent: FoldersContent = JSON.parse(foldersString)
      const folders: Folder[] = foldersContent.folders.map((folder) => {return this.folderDtoToFolderMapper.map(folder)})
      const markFolderIndex = folders.findIndex(i => i.id === idFolder)
      const deleteMarkIndex = folders[markFolderIndex].marks.findIndex(i => i.id === mark.id)
      const isMarkIncluded = deleteMarkIndex !== -1
      if (isMarkIncluded) {
        folders[markFolderIndex].marks.splice(deleteMarkIndex,1)
        foldersContent.folders = folders.map((folder) => {return this.folderToFolderDtoMapper.map(folder)})
        this.storage.setItem('folders', JSON.stringify(foldersContent))
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

  async createFolder(createFolderDto: CreateFolderDto): Promise<any> {
    const foldersString = this.storage.getItem('folders')
    if (foldersString !== null) {
      let foldersContent: FoldersContent = JSON.parse(foldersString)
      let folders: Folder[] = foldersContent.folders.map((folder) => {return this.folderDtoToFolderMapper.map(folder)})
      const folder: Folder = this.createFolderDtoToFolderMapper.map(createFolderDto)
      folders = [...folders, folder]
      foldersContent.folders = folders.map((folder) => {return this.folderToFolderDtoMapper.map(folder)})
      this.storage.setItem('folders', JSON.stringify(foldersContent))
      return folder
    }
  }

  async editFolder(folder: Folder): Promise<any> {
    const foldersString = this.storage.getItem('folders')
    if (foldersString !== null) {

      let foldersContent: FoldersContent = JSON.parse(foldersString)
      const folders: Folder[] = foldersContent.folders.map((folder) => {return this.folderDtoToFolderMapper.map(folder)})
      const editFolderIndex = folders.findIndex(i => i.id === folder.id)
      const isFolderIncluded = editFolderIndex !== -1
      if (isFolderIncluded) {
        folders[editFolderIndex].name = folder.name
        foldersContent.folders = folders.map((folder) => {return this.folderToFolderDtoMapper.map(folder)})
        this.storage.setItem('folders', JSON.stringify(foldersContent))
      }
    }
  }

  async deleteFolder(id: string): Promise<any> {
    const foldersString = this.storage.getItem('folders')
    if (foldersString !== null) {
      let foldersContent: FoldersContent = JSON.parse(foldersString)
      const folders: Folder[] = foldersContent.folders.map((folder) => {return this.folderDtoToFolderMapper.map(folder)})
      const folderToDeleteIndex = folders.findIndex(i => i.id === id)
      const isFolderIncluded = folderToDeleteIndex !== -1
      if (isFolderIncluded) {
        folders.splice(folderToDeleteIndex,1)
        foldersContent.folders = folders.map((folder) => {return this.folderToFolderDtoMapper.map(folder)})
        this.storage.setItem('folders', JSON.stringify(foldersContent))
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
}
