import {MarkRepository} from "../../domain/mark-repository";

export class GetMarksUseCase {
  constructor(private readonly markRepository: MarkRepository) {}

  async execute() {
    return this.markRepository.findAll()
  }
}
