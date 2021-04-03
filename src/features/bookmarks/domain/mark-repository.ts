import { Mark } from './mark'

export interface MarkRepository {
  findAll(): Promise<Mark[]>
  create(mark: Mark): Promise<void>
}
