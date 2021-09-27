import {UserDto} from "./user-dto";
import {User} from "../../domain/user/user";

export class UserDtoToUserMapper {
  map(todoDto: UserDto): User {
    return {
      id: todoDto.id,
      email: todoDto.email,
      name: todoDto.name,
      password: todoDto.password,
      createdAt: todoDto.createdAt,
      updatedAt: todoDto.updatedAt
    }
  }
}
