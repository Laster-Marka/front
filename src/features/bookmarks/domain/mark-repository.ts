import { Mark } from './mark'
import {Folder} from "./folder";

export interface MarkRepository {
  findAll(): Promise<Mark[]>
  create(mark: Mark): Promise<void>
  delete(mark: Mark): Promise<number>
  findFolders(): Promise<Folder[]>
  createFolder(folder: Folder): Promise<void>
}
