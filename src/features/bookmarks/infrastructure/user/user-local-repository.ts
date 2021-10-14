import {inject} from "tsyringe";
import {STORAGE} from "../../../../core/types/types";
import {User} from "../../domain/user/user";
import {EditPassword} from "../../domain/user/edit-password";
import {UserRepository} from "../../domain/user/user-repository";
import {UserLogin} from "../../domain/user/user-login";
import {UserRegister} from "../../domain/user/user-register";

export class UserLocalRepository implements UserRepository {
  constructor(@inject(STORAGE) private readonly storage: Storage) {}

  async signUp(user: UserRegister): Promise<any> {
    const userString = this.storage.getItem('users')
    if (userString !== null) {
      let users: User[] = JSON.parse(userString)
      console.log("users: " + users)
      const findEmailDuplicateIndex = users.findIndex(i => i.email === user.email)
      console.log("findEmailDuplicateIndex: " + findEmailDuplicateIndex)
      const findNameDuplicateIndex = users.findIndex(i => i.name === user.name)
      const isEmailDuplicated = findEmailDuplicateIndex !== -1
      console.log("isEmailDuplicated: " + isEmailDuplicated)
      const isNameDuplicated = findNameDuplicateIndex !== -1
      if(!isEmailDuplicated){
        if(!isNameDuplicated) {
          //TODO: userRegisterToUser
          if (user.password === user.confirmPassword) {
            const userDto: User = {
              id: "1",
              email: user.email,
              name: user.name,
              password: user.password,
              createdAt: new Date(),
              updatedAt: new Date()
            }
            users = [...users, userDto]
            this.storage.setItem('users', JSON.stringify(users))
          } else{
            return "name already exist"
          }
        }
      } else{
        return "email already exist"
      }
    } else{
      return "db error"
    }
  }

  async logIn(user: UserLogin): Promise<any> {
    const userString = this.storage.getItem('users')
    if (userString !== null) {
      let users: User[] = JSON.parse(userString)
      const findUserIndex = users.findIndex(i => i.email === user.email)
      const isUser = findUserIndex !== -1
      if(isUser){
        if(user.password === users[findUserIndex].password){
          this.storage.setItem('active-user', JSON.stringify(user))
        } else{
          return "user or password error"
        }
      } else{
        return "user or password error"
      }
    }
    return "db error"
  }

  async logOut(): Promise<any> {
    const userString = this.storage.getItem('active-user')
    let resultError: boolean = false
    if (userString !== null) {
      this.storage.setItem('active-user', JSON.stringify(""))
    } else{
      resultError = true
    }
    return resultError
  }

  async get(): Promise<any> {
    let userString: string | null = null
    userString = this.storage.getItem('active-user')
    if (userString !== null) {
      let user: User = JSON.parse(userString)
      return user
    } else{
      return null
    }
  }

  async edit(user: User): Promise<any> {
    const userString = this.storage.getItem('active-user')
    let resultError: boolean = false
    if (userString !== null) {
      let dbUser: User = JSON.parse(userString)
      dbUser.name = user.name
      this.storage.setItem('active-user', JSON.stringify(dbUser))
    } else{
      resultError = true
    }
    return resultError
  }

  async editPassword(editPassword: EditPassword): Promise<any> {
    const usersString = this.storage.getItem('users')
    const userString = this.storage.getItem('active-user')
    let resultError: boolean = false
    if (userString !== null && usersString !== null) {
      let dbUser: User = JSON.parse(userString)
      let users: User[] = JSON.parse(usersString)
      const findUserIndex = users.findIndex(i => i.email === dbUser.email)
      const isUser = findUserIndex !== -1
      if(isUser && editPassword.oldPassword === users[findUserIndex].password && editPassword.newPassword === editPassword.newConfirmPassword){
        dbUser.password = editPassword.newPassword
        users[findUserIndex].password = editPassword.newPassword
        this.storage.setItem('active-user', JSON.stringify(dbUser))
        this.storage.setItem('users', JSON.stringify(users))
      } else{
        resultError = true
      }
    } else{
      resultError = true
    }
    return resultError
  }

  async delete(user: User): Promise<any> {
    const userString = this.storage.getItem('users')
    let resultError: boolean = false
    if (userString !== null) {
      let users: User[] = JSON.parse(userString)
      const userToDeleteIndex = users.findIndex(i => i.email === user.email)
      const isUser = userToDeleteIndex !== -1
      if (isUser) {
        users.splice(userToDeleteIndex, 1)
        this.storage.setItem('users', JSON.stringify(users))
        this.storage.setItem('active-user', JSON.stringify(""))
      } else {
        resultError = true
      }
    } else {
      resultError = true
    }
    return resultError
  }
}
