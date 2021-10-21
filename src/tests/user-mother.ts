import { User } from '../features/bookmarks/domain/user/user'

export class UserMother {
  static patxi(): User {
    return {
      id: '1',
      name: 'Patxi',
      email: 'patxi@laster.com',
      password: 'patxipatxi',
      createdAt: new Date('2019-01-17'),
      updatedAt: new Date('2019-01-30'),
    }
  }
}
