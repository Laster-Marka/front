import {MarkRepository} from "../../domain/mark-repository";

export class GetMarksUseCase {
  constructor(private readonly todoRepository: MarkRepository) {}

  async execute() {
    return this.todoRepository.findAll()
  }
}
