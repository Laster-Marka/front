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
    const response = await http.post('/user/signup', {createUserDto: user})
    return response.data
  }

  async logIn(user: UserLogin): Promise<any> {
    const response = await http.post('/user/login', {getUserDto: user})
    return response.data
  }

  async logOut(user: User): Promise<any> {
    const response = await http.post('/user/logout', {getUserDto: this.userToUserDtoMapper.map(user)})
    return response.data
  }

  async get(): Promise<any> {
    const response = await http.get(`/user`, {withCredentials: true})
    if(response === undefined){
      return null
    }

    return response.data
  }

  async edit(user: User): Promise<any> {
    const response = await http.put(`/user`, {editMarkDto: this.userToUserDtoMapper.map(user)})
    this.userDtoToUserMapper.map(response.data)
    return []
  }

  async editPassword(editPassword: EditPassword): Promise<any> {
    const response = await http.put(`/user/password`, {editPasswordDto: editPassword})
    this.userDtoToUserMapper.map(response.data)
    return []
  }

  async delete(user: User): Promise<any> {
    const response = await http.delete(`/edit/${user.name}`)
    return response
  }
}
