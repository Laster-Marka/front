import { Mark } from '../features/bookmarks/domain/mark/mark'

export class MarkMother {
  static bestPokemon(): Mark {
    return {
      id: "1",
      title: 'Best pokemon',
      link: 'https://pokemon.fandom.com/es/wiki/Psyduck',
      type: 'Text',
      tags: [{name: 'POKEMON'}, {name: 'BEST'}, {name: 'PSYDUCK'}],
      description: 'Psyduck says psy',
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
      tags: [{name: 'STACKOVERFLOW'}, {name: 'VIM'}],
      description: ':p',
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
      link: 'https://es.ayuda.yahoo.com/kb/answers',
      type: 'Text',
      tags: [{name: 'YAHOO'}, {name: 'PHILOSOPHY'}, {name: 'NIETZSCHE'}],
      description: 'Yahoo Respuestas saved my life, now I am a superhuman',
      image: "",
      markdown: "",
      createdAt: new Date("2019-01-16"),
      updatedAt: new Date("2019-01-20")
    }
  }
}
