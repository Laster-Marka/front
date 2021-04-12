import {MarkRepository} from "../../domain/mark-repository";

export class GetFoldersUseCase {
  constructor(private readonly markRepository: MarkRepository) {}

  async execute() {
    return this.markRepository.findFolders()
  }
}
