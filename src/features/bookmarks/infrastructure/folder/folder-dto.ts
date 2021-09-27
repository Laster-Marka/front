import {MarkDto} from "../mark/mark-dto";

export interface FolderDto {
  _id: string
  name: string
  marks: MarkDto[]
  isPublic: boolean
  color: string
  createdAt: Date
  updatedAt: Date
}
