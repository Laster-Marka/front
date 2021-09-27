import {User} from "../../domain/user/user";
import {UserDto} from "./user-dto";

export class UserToUserDtoMapper {
  map({ id, email, name, password, createdAt, updatedAt }: User): UserDto {
    return {
      id: id,
      email: email,
      name: name,
      password: password,
      createdAt: createdAt,
      updatedAt: updatedAt
    }
  }
}

