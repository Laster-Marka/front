import {MarkRepository} from "../../domain/mark/mark-repository";
import {Mark} from "../../domain/mark/mark";
import {http} from "../../../../core/http/http";
import {Folder} from "../../domain/folder/folder";
import {CreateMarkDto} from "./create-mark-dto";
import {MarkToEditMarkDtoMapper} from "./mark-to-edit-mark-dto";
import {CreateFolderDto} from "../folder/create-folder-dto";
import {FolderToEditFolderDtoMapper} from "../folder/folder-to-edit-folder-dto-mapper";
import {AxiosResponse} from "axios";
import {FolderDtoToFolderMapper} from "../folder/folder-dto-to-folder-mapper"
import {FoldersContent} from "../folder/folders-content";
import {FolderDto} from "../folder/folder-dto";

export class MarkHttpRepository implements MarkRepository {
  constructor(
    private readonly markToEditMarkDtoMapper: MarkToEditMarkDtoMapper,
    private readonly folderToEditFolderDtoMapper: FolderToEditFolderDtoMapper,
    private readonly folderDtoToFolderMapper: FolderDtoToFolderMapper
  ) {}

  private checkCatchedError(error: any) {
    if (error.response) {
      if(error.response.status === 401) {
        return error.response.status.toString()
      }
      return error.response.data.message
    } else if (error.request) {
      return "No response"
    } else {
      return "Wrong request"
    }
  }

  async findAll(): Promise<any> {
    const response: AxiosResponse = await http.get('/home')
    const foldersContent: FoldersContent = response.data
    if(foldersContent.folders.length !== 0){
      const folders: Folder[] = foldersContent.folders.map((folder: FolderDto) => {return this.folderDtoToFolderMapper.map(folder)})
      return folders
    }
    else {
      return foldersContent.folders
    }
  }

  async create(createMarkDto: CreateMarkDto, idFolder: string): Promise<any> {
    return await http.post('/mark', {createMarkDto: createMarkDto, folderId: idFolder}).then(() => {
      return null
    }).catch((error) => {
      return this.checkCatchedError(error)
    })
  }

  async edit(mark: Mark): Promise<any> {
    return await http.put(`/mark/${mark.id}`, {editMarkDto: this.markToEditMarkDtoMapper.map(mark)}).then(() => {
      return null
    }).catch((error) => {
      return this.checkCatchedError(error)
    })
  }

  async delete(mark: Mark): Promise<any> {
    return await http.delete(`/mark/${mark.id}`).then(() => {
      return null
    }).catch((error) => {
      return this.checkCatchedError(error)
    })
  }

  async createFolder(createFolderDto: CreateFolderDto): Promise<any> {
    //TODO
    createFolderDto.color = "60cb9f4748aa37109ef88e7f"
    return await http.post('/folder', {createFolderDto: createFolderDto}).then(() => {
      return null
    }).catch((error) => {
      return this.checkCatchedError(error)
    })
  }

  async editFolder(folder: Folder): Promise<any> {
    return await http.put(`/folder/${folder.id}`, {editFolderDto: this.folderToEditFolderDtoMapper.map(folder)}).then(() => {
      return null
    }).catch((error) => {
      return this.checkCatchedError(error)
    })
  }

  async deleteFolder(id: string): Promise<any> {
    return await http.delete(`/folder/${id}`).then(() => {
      return null
    }).catch((error) => {
      return this.checkCatchedError(error)
    })
  }
}
