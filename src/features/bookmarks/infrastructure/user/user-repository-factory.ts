import { UserRepository } from '../../domain/user/user-repository'
import { UserHttpRepository } from './user-http-repository'
import { UserToUserDtoMapper } from './user-to-user-dto-mapper'
import { UserLocalRepository } from './user-local-repository'

export class UserRepositoryFactory {
  static build(): UserRepository {
    return new UserHttpRepository(new UserToUserDtoMapper())
  }
  static buildLocal(): UserRepository {
    return new UserLocalRepository(localStorage)
  }
}
