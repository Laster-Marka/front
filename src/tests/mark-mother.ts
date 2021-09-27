import { Mark } from '../features/bookmarks/domain/mark/mark'

export class MarkMother {
  static videoCat(): Mark {
    return {
      id: "1",
      title: 'Cute Cat',
      link: 'https://www.youtube.com/watch?v=cMESRatAG04&t=40s&ab_channel=nigahiga10able',
      type: 'Video',
      tags: [{name: 'cat'}, {name: 'cute'}, {name: 'no'}],
      description: 'The cat says no, lol',
      image: "",
      markdown: "",
      createdAt: new Date("2019-01-17"),
      updatedAt: new Date("2019-01-30")
    }
  }
  static markdownVim(): Mark {
    return {
      id: "2",
      title: 'How to exit Vim',
      link: 'https://stackoverflow.com/questions/11828270/how-do-i-exit-the-vim-editor',
      type: 'Markdown',
      tags: [{name: 'stackoverflow'}, {name: 'vim'}],
      description: ':q',
      image: "",
      markdown: "",
      createdAt: new Date("2019-01-18"),
      updatedAt: new Date("2019-01-20")
    }
  }
  static textYahoo(): Mark {
    return {
      id: "3",
      title: 'Philosophy',
      link: 'https://es.answers.yahoo.com/question/index;_ylt=AwrC0CZFcVdgAiAABhz_0IlQ;_ylu=Y29sbwNiZjEEcG9zAzEEdnRpZAMEc2VjA3Ny?qid=20070725051041AA6AU53',
      type: 'Text',
      tags: [{name: 'yahoo'}, {name: 'philosophy'}, {name: 'nietzsche'}],
      description: 'Yahoo Respuestas saved my life, now I am a superhuman',
      image: "",
      markdown: "",
      createdAt: new Date("2019-01-16"),
      updatedAt: new Date("2019-01-20")
    }
  }
}
