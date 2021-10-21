import { Mark } from '../mark/mark'

export interface Folder {
  id: string
  name: string
  marks: Mark[]
  isPublic: boolean
  color: string
  createdAt: Date
  updatedAt: Date
}
