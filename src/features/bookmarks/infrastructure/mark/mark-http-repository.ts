import {MarkRepository} from "../../domain/mark-repository";
import {Mark} from "../../domain/mark";
import {http} from "../../../../core/http/http";
import {MarkDto} from "./mark-dto";
import {MarkDtoToMarkMapper} from "./mark-dto-to-mark-mapper";
import {MarkToMarkDtoMapper} from "./mark-to-mark-dto-mapper";

export class MarkHttpRepository implements MarkRepository {
  constructor(
    private readonly markDtoToMarkMapper: MarkDtoToMarkMapper,
    private readonly markToMarkDtoMapper: MarkToMarkDtoMapper
  ) {}

  async findAll(): Promise<Mark[]> {
    const response = await http.get<MarkDto[]>('/marks')
    return response.data.map(markDto => this.markDtoToMarkMapper.map(markDto))
  }

  async create(mark: Mark): Promise<void> {
    await http.post('/marks', this.markToMarkDtoMapper.map(mark))
  }
}
