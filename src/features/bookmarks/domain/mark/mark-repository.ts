import { Mark } from './mark'
import {Folder} from "../folder/folder";
import {CreateMarkDto} from "../../infrastructure/mark/create-mark-dto";
import {CreateFolderDto} from "../../infrastructure/folder/create-folder-dto";

export interface MarkRepository {
  findAll(): Promise<Folder[]>
  create(mark: CreateMarkDto, idFolder: string): Promise<any>
  edit(mark: Mark): Promise<any>
  delete(mark: Mark, idFolder: string): Promise<any>
  createFolder(folder: CreateFolderDto): Promise<any>
  editFolder(folder: Folder): Promise<any>
  deleteFolder(idFolder: string): Promise<any>
}
