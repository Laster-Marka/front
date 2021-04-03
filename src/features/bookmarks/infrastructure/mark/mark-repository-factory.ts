import {MarkRepository} from "../../domain/mark-repository";
import {MarkHttpRepository} from "./mark-http-repository";
import {MarkDtoToMarkMapper} from "./mark-dto-to-mark-mapper";
import {MarkToMarkDtoMapper} from "./mark-to-mark-dto-mapper";
import {MarkLocalRepository} from "./mark-local-repository";

export class MarkRepositoryFactory {
  static build(): MarkRepository {
    return new MarkHttpRepository(new MarkDtoToMarkMapper(), new MarkToMarkDtoMapper())
  }
  static buildLocal(): MarkRepository {
    return new MarkLocalRepository(localStorage)
  }
}
