import {MarkRepository} from "../../domain/mark-repository";
import {Mark} from "../../domain/mark";
import {inject} from "tsyringe";
import {STORAGE} from "../../../../core/types/types";

export class MarkLocalRepository implements MarkRepository {
  constructor(@inject(STORAGE) private readonly storage: Storage) {}

  async findAll(): Promise<Mark[]> {
    const marksString = this.storage.getItem('marks')

    if (marksString === null) {
      return []
    } else {
      const marks = JSON.parse(marksString)
      return marks
    }
  }

  async create(mark: Mark): Promise<void> {
    const marksString = this.storage.getItem('marks')
    if (marksString !== null) {
      let marks = JSON.parse(marksString)
      marks = [...marks, mark]
      this.storage.setItem('marks', JSON.stringify(marks))
    }
  }
}
