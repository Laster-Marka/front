import {http} from "../../../../core/http/http";
import {UserRepository} from "../../domain/user/user-repository";
import {User} from "../../domain/user/user";
import {EditPassword} from "../../domain/user/edit-password";
import {UserDtoToUserMapper} from "./user-dto-to-user-mapper";
import {UserToUserDtoMapper} from "./user-to-user-dto-mapper";
import {UserLogin} from "../../domain/user/user-login";
import {UserRegister} from "../../domain/user/user-register";

export class UserHttpRepository implements UserRepository {
  constructor(
    private readonly userDtoToUserMapper: UserDtoToUserMapper,
    private readonly userToUserDtoMapper: UserToUserDtoMapper
  ) {}

  async signUp(user: UserRegister): Promise<any> {
    const response = await http.post('/signup', {createUserDto: user})
    return response
  }

  async logIn(user: UserLogin): Promise<any> {
    const response = await http.post('/signin', {getUserDto: user})
    return response
  }

  async logOut(user: User): Promise<any> {
    const response = await http.post('/signout', {getUserDto: this.userToUserDtoMapper.map(user)})
    return response
  }

  async get(token: string): Promise<any> {
    const response = await http.post(`/token`, {token: token})
    return response
  }

  async edit(user: User): Promise<any> {
    const response = await http.put(`/edit/${user.name}`, {editMarkDto: this.userToUserDtoMapper.map(user)})
    this.userDtoToUserMapper.map(response.data)
    return []
  }

  async editPassword(user: User, editPassword: EditPassword): Promise<any> {
    const response = await http.put(`/edit/${user.name}`, {editPasswordDto: editPassword})
    this.userDtoToUserMapper.map(response.data)
    return []
  }

  async delete(user: User): Promise<any> {
    const response = await http.delete(`/edit/${user.name}`)
    return response
  }
}
