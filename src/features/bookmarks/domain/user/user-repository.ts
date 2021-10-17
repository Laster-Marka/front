import {User} from "./user";
import {EditPassword} from "./edit-password";
import {UserLogin} from "./user-login";
import {UserRegister} from "./user-register";

export interface UserRepository {
  signUp(user: UserRegister): Promise<any>
  logIn(user: UserLogin): any
  logOut(): Promise<any>
  get(): Promise<User>
  edit(user: User): Promise<User>
  editPassword(editPassword: EditPassword): Promise<User>
  delete(user: User): Promise<any>
}
