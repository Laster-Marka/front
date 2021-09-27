import {MarkRepository} from "../../domain/mark/mark-repository";
import {Mark} from "../../domain/mark/mark";
import {http} from "../../../../core/http/http";
import {MarkDto} from "./mark-dto";
import {MarkDtoToMarkMapper} from "./mark-dto-to-mark-mapper";
import {Folder} from "../../domain/folder/folder";
import {CreateMarkDto} from "./create-mark-dto";
import {MarkToEditMarkDtoMapper} from "./mark-to-edit-mark-dto";
import {CreateFolderDto} from "../folder/create-folder-dto";
import {FolderToEditFolderDtoMapper} from "../folder/folder-to-edit-folder-dto-mapper";
import {EditFolderDto} from "../folder/edit-folder-dto";
//TODO: Promise response
export class MarkHttpRepository implements MarkRepository {
  constructor(
    private readonly markDtoToMarkMapper: MarkDtoToMarkMapper,
    private readonly markToEditMarkDtoMapper: MarkToEditMarkDtoMapper,
    private readonly folderToEditFolderDtoMapper: FolderToEditFolderDtoMapper
  ) {}

  async findAll(): Promise<Folder[]> {
    await http.get<MarkDto[]>('/home')
    return []
  }

  async create(createMarkDto: CreateMarkDto, idFolder: string): Promise<any> {
    await http.post('/mark', {createMarkDto: createMarkDto, folderId: idFolder})
  }

  async edit(mark: Mark): Promise<any> {
    const response = await http.put(`/mark/${mark.id}`, {editMarkDto: this.markToEditMarkDtoMapper.map(mark)})
    this.markDtoToMarkMapper.map(response.data)
    return []
  }

  async delete(mark: Mark): Promise<any> {
    await http.delete(`/mark/${mark.id}`)
    return 1
  }

  async createFolder(createFolderDto: CreateFolderDto): Promise<any> {
    await http.post('/folder', {createFolderDto: createFolderDto})
  }

  async editFolder(folder: Folder): Promise<any> {
    const editFolderDto: EditFolderDto = this.folderToEditFolderDtoMapper.map(folder)
    await http.put(`/folder/${folder.id}`, {editFolderDto: editFolderDto})
  }

  async deleteFolder(id: string): Promise<any> {
    await http.delete(`/folder/${id}`)
    return 1
  }
}
