import { Mark } from '../features/bookmarks/domain/mark'

export class MarkMother {
  static youtubeCat(): Mark {
    return {
      title: 'Cute Cat',
      link: 'https://www.youtube.com/watch?v=cMESRatAG04&t=40s&ab_channel=nigahiga10able',
      tags: ['cat', 'cute', 'no'],
      description: 'The cat says no, lol',
    }
  }
  static exitVim(): Mark {
    return {
      title: 'Cute Cat',
      link: 'https://stackoverflow.com/questions/11828270/how-do-i-exit-the-vim-editor',
      tags: ['stackoverflow', 'vim'],
      description: ':q',
    }
  }
}
