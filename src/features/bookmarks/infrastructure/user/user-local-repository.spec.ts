import {UserLocalRepository} from "./user-local-repository";
import {UserMother} from "../../../../tests/user-mother";
import {instance, mock, when} from "ts-mockito";
import {UserRegister} from "../../domain/user/user-register";
import {UserLogin} from "../../domain/user/user-login";


describe('signup', () => {
  it('should sign up a new user', async () => {
    const {storage, userLocalRepository} = setup()
    when(storage.getItem('users')).thenReturn(`[{"id":"2","email":"albert@laster.com","password":"albert","name":"albert"}]`)
    const user: UserRegister = {name: "Patxi", email: "patxi@laster.com", password: "patxipatxi", confirmPassword: "patxipatxi"}
    const actual = await userLocalRepository.signUp(user)

    actual.id = "1"
    actual.createdAt = new Date("2019-01-17T00:00:00.000Z")
    actual.updatedAt = new Date("2019-01-30T00:00:00.000Z")

    expect(actual).toEqual(UserMother.patxi())
  })
})

describe('signup email exist', () => {
  it('should return duplicated email', async () => {
    const {storage, userLocalRepository} = setup()
    when(storage.getItem('users')).thenReturn(`[{"id":"2","email":"albert@laster.com","password":"albert","name":"albert"},{"id":"1","email":"patxi@laster.com","name":"Patxi","password":"patxipatxi","createdAt":"2019-01-17T00:00:00.000Z","updatedAt":"2019-01-30T00:00:00.000Z"}]`)
    const user: UserRegister = {name: "Patxi", email: "patxi@laster.com", password: "patxipatxi", confirmPassword: "patxipatxi"}
    const actual = await userLocalRepository.signUp(user)

    expect(actual).toBe("email already exist")
  })
})

describe('signup name exist', () => {
  it('should return duplicated name', async () => {
    const {storage, userLocalRepository} = setup()
    when(storage.getItem('users')).thenReturn(`[{"id":"2","email":"albert@laster.com","password":"albert","name":"albert"},{"id":"1","email":"patxi1@laster.com","name":"Patxi","password":"patxipatxi","createdAt":"2019-01-17T00:00:00.000Z","updatedAt":"2019-01-30T00:00:00.000Z"}]`)
    const user: UserRegister = {name: "Patxi", email: "patxi@laster.com", password: "patxipatxi", confirmPassword: "patxipatxi"}
    const actual = await userLocalRepository.signUp(user)

    expect(actual).toBe("name already exist")
  })
})

describe('signup wrong password', () => {
  it('should return not same password', async () => {
    const {storage, userLocalRepository} = setup()
    when(storage.getItem('users')).thenReturn(`[{"id":"2","email":"albert@laster.com","password":"albert","name":"albert"}]`)
    const user: UserRegister = {name: "Patxi", email: "patxi@laster.com", password: "patxipatxi", confirmPassword: "patxi"}
    const actual = await userLocalRepository.signUp(user)

    expect(actual).toBe("passwords do not match")
  })
})

describe('login', () => {
  it('should login a user', async () => {
    const {storage, userLocalRepository} = setup()
    when(storage.getItem('users')).thenReturn(`[{"id":"2","email":"albert@laster.com","password":"albert","name":"albert"},{"id":"1","email":"patxi@laster.com","name":"Patxi","password":"patxipatxi","createdAt":"2019-01-17T00:00:00.000Z","updatedAt":"2019-01-30T00:00:00.000Z"}]`)
    const user: UserLogin = {email: "patxi@laster.com", password: "patxipatxi"}
    const actual = await userLocalRepository.logIn(user)

    actual.createdAt = new Date(actual.createdAt)
    actual.updatedAt = new Date(actual.updatedAt)

    expect(actual).toEqual(UserMother.patxi())
  })
})

describe('wrong password login', () => {
  it('should return login error', async () => {
    const {storage, userLocalRepository} = setup()
    when(storage.getItem('users')).thenReturn(`[{"id":"2","email":"albert@laster.com","password":"albert","name":"albert"},{"id":"1","email":"patxi@laster.com","name":"Patxi","password":"patxipatxi","createdAt":"2019-01-17T00:00:00.000Z","updatedAt":"2019-01-30T00:00:00.000Z"}]`)
    const user: UserLogin = {email: "patxi@laster.com", password: "patxi"}
    const actual = await userLocalRepository.logIn(user)

    expect(actual).toEqual("wrong user or password")
  })
})

describe('wrong email login', () => {
  it('should return login error', async () => {
    const {storage, userLocalRepository} = setup()
    when(storage.getItem('users')).thenReturn(`[{"id":"2","email":"albert@laster.com","password":"albert","name":"albert"},{"id":"1","email":"patxi@laster.com","name":"Patxi","password":"patxipatxi","createdAt":"2019-01-17T00:00:00.000Z","updatedAt":"2019-01-30T00:00:00.000Z"}]`)
    const user: UserLogin = {email: "patxi1@laster.com", password: "patxipatxi"}
    const actual = await userLocalRepository.logIn(user)

    expect(actual).toEqual("wrong user or password")
  })
})

function setup() {
  const storage = mock<Storage>()
  return {
    storage,
    userLocalRepository: new UserLocalRepository(instance(storage))
  }
}
