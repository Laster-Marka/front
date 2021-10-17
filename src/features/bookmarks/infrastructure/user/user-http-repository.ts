import {http} from "../../../../core/http/http";
import {UserRepository} from "../../domain/user/user-repository";
import {User} from "../../domain/user/user";
import {EditPassword} from "../../domain/user/edit-password";
import {UserToUserDtoMapper} from "./user-to-user-dto-mapper";
import {UserLogin} from "../../domain/user/user-login";
import {UserRegister} from "../../domain/user/user-register";

export class UserHttpRepository implements UserRepository {
  constructor(
    private readonly userToUserDtoMapper: UserToUserDtoMapper
  ) {}

  private checkCatchedError(error: any) {
    if (error.response) {
      return error.response.data.message
    } else if (error.request) {
      return "No response"
    } else {
      return "Wrong request"
    }
  }

  async signUp(user: UserRegister): Promise<any> {
    if(user.password === user.confirmPassword) {
      return await http.post('/user/signup', {createUserDto: user}).catch((error) => {
        return this.checkCatchedError(error)
      })
    }
    return "Passwords do not match"
  }

  async logIn(user: UserLogin): Promise<any> {
    return await http.post('/user/login', {getUserDto: user}).catch((error) => {
      return this.checkCatchedError(error)
    })
  }

  async logOut(): Promise<any> {
    return await http.post('/user/logout').catch((error) => {
      return this.checkCatchedError(error)
    })
  }

  async get(): Promise<any> {
    return await http.get(`/user`, {withCredentials: true}).then((response) => {
      return response.data
    }).catch(() => {
      return ""
    })
  }

  async edit(user: User): Promise<any> {
    return await http.put(`/user`, {editMarkDto: this.userToUserDtoMapper.map(user)}).catch((error) => {
      return this.checkCatchedError(error)
    })
  }

  async editPassword(editPassword: EditPassword): Promise<any> {
    return await http.put(`/user/password`, {editPasswordDto: editPassword}).catch((error) => {
      return this.checkCatchedError(error)
    })
  }

  async delete(user: User): Promise<any> {
    return await http.delete(`/edit/${user.name}`).catch((error) => {
      return this.checkCatchedError(error)
    })
  }
}
