import {User} from "./user";
import {EditPassword} from "./edit-password";
import {UserLogin} from "./user-login";
import {UserRegister} from "./user-register";

export interface UserRepository {
  signUp(user: UserRegister): Promise<User>
  logIn(user: UserLogin): Promise<User>
  logOut(user: User): Promise<any>
  get(token: string): Promise<User>
  edit(user: User): Promise<User>
  editPassword(user: User, editPassword: EditPassword): Promise<User>
  delete(user: User): Promise<any>
}
