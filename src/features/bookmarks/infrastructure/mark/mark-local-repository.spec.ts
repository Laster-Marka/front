import {MarkLocalRepository} from "./mark-local-repository";
import {FolderDtoToFolderMapper} from "../folder/folder-dto-to-folder-mapper";
import {MarkDtoToMarkMapper} from "./mark-dto-to-mark-mapper";
import {TagDtoToTagMapper} from "../tag/tag-dto-to-tag-mapper";
import {FolderToFolderDtoMapper} from "../folder/folder-to-folder-dto-mapper";
import {MarkToMarkDtoMapper} from "./mark-to-mark-dto-mapper";
import {TagToTagDtoMapper} from "../tag/tag-to-tag-dto-mapper";
import {CreateFolderDtoToFolderMapper} from "../folder/create-folder-dto-to-folder";
import {CreateMarkDtoToMarkMapper} from "./create-mark-dto-to-mark";
import {instance, mock, when} from "ts-mockito";
import {FolderMother} from "../../../../tests/folder-mother";
import {CreateMarkDto} from "./create-mark-dto";
import {MarkMother} from "../../../../tests/mark-mother";
import {Mark} from "../../domain/mark/mark";
import {CreateFolderDto} from "../folder/create-folder-dto";
import {Folder} from "../../domain/folder/folder";

describe('findAll', () => {
  it('should find all folders', async () => {
    const {storage, markLocalRepository} = setup()
    when(storage.getItem('folders')).thenReturn(`{"folders":[{"_id":"1","name":"Pokemon","marks":[{"_id":"1","title":"Best pokemon","link":"https://pokemon.fandom.com/es/wiki/Psyduck","type":[{"name":"Text"}],"tags":[{"_id":"1","name":"POKEMON"},{"_id":"2","name":"BEST"},{"_id":"3","name":"PSYDUCK"}],"description":"Psyduck says psy","image":"","markdown":"","createdAt":"2019-01-17T00:00:00.000Z","updatedAt":"2019-01-30T00:00:00.000Z"}],"isPublic":false,"color":"","createdAt":"2019-01-17T00:00:00.000Z","updatedAt":"2019-01-30T00:00:00.000Z"},{"_id":"2","name":"Answers","marks":[{"_id":"2","title":"How to exit Vim","link":"https://stackoverflow.com/questions/11828270/how-do-i-exit-the-vim-editor","type":[{"name":"Markdown"}],"tags":[{"_id":"4","name":"STACKOVERFLOW"},{"_id":"5","name":"VIM"}],"description":":p","image":"","markdown":"","createdAt":"2019-01-18T00:00:00.000Z","updatedAt":"2019-01-20T00:00:00.000Z"},{"_id":"3","title":"Philosophy","link":"https://es.ayuda.yahoo.com/kb/answers","type":[{"name":"Text"}],"tags":[{"_id":"6","name":"YAHOO"},{"_id":"7","name":"PHILOSOPHY"},{"_id":"8","name":"NIETZSCHE"}],"description":"Yahoo Respuestas saved my life, now I am a superhuman","image":"","markdown":"","createdAt":"2019-01-16T00:00:00.000Z","updatedAt":"2019-01-20T00:00:00.000Z"}],"isPublic":false,"color":"","createdAt":"2019-01-17T00:00:00.000Z","updatedAt":"2019-01-30T00:00:00.000Z"}]}`)

    const actual = await markLocalRepository.findAll()

    expect(actual).toEqual([FolderMother.pokemon(), FolderMother.answers()])
  })
})
describe('findAll no data', () => {
  it('should return empty array', async () => {
    const {storage, markLocalRepository} = setup()
    when(storage.getItem('folders')).thenReturn(`{"folders":[]}`)

    const actual = await markLocalRepository.findAll()

    expect(actual).toEqual([])
  })
})

describe('create', () => {
  it('should create a mark', async () => {
    const {storage, markLocalRepository} = setup()
    when(storage.getItem('folders')).thenReturn(`{"folders":[{"_id":"1","name":"Pokemon","marks":[{"_id":"1","title":"Best pokemon","link":"https://pokemon.fandom.com/es/wiki/Psyduck","type":[{"name":"Text"}],"tags":[{"_id":"1","name":"POKEMON"},{"_id":"2","name":"BEST"},{"_id":"3","name":"PSYDUCK"}],"description":"Psyduck says psy","image":"","markdown":"","createdAt":"2019-01-17T00:00:00.000Z","updatedAt":"2019-01-30T00:00:00.000Z"}],"isPublic":false,"color":"","createdAt":"2019-01-17T00:00:00.000Z","updatedAt":"2019-01-30T00:00:00.000Z"},{"_id":"2","name":"Answers","marks":[{"_id":"2","title":"How to exit Vim","link":"https://stackoverflow.com/questions/11828270/how-do-i-exit-the-vim-editor","type":[{"name":"Markdown"}],"tags":[{"_id":"4","name":"STACKOVERFLOW"},{"_id":"5","name":"VIM"}],"description":":p","image":"","markdown":"","createdAt":"2019-01-18T00:00:00.000Z","updatedAt":"2019-01-20T00:00:00.000Z"}],"isPublic":false,"color":"","createdAt":"2019-01-17T00:00:00.000Z","updatedAt":"2019-01-30T00:00:00.000Z"}]}`)
    const createMarkDto:CreateMarkDto = {title:"Philosophy",link:"https://es.ayuda.yahoo.com/kb/answers",type:"Text",tags:[{name:"YAHOO"},{name:"PHILOSOPHY"},{name:"NIETZSCHE"}],description:"Yahoo Respuestas saved my life, now I am a superhuman",image:"",markdown:""}

    const actual:Mark = await markLocalRepository.create(createMarkDto, "2")

    actual.id = "3"
    actual.createdAt = new Date("2019-01-16T00:00:00.000Z")
    actual.updatedAt = new Date("2019-01-20T00:00:00.000Z")

    expect(actual).toEqual(MarkMother.textYahoo())
  })
})

describe('edit', () => {
  it('should edit a mark', async () => {
    const {storage, markLocalRepository} = setup()
    when(storage.getItem('folders')).thenReturn(`{"folders":[{"_id":"1","name":"Pokemon","marks":[{"_id":"1","title":"Best pokemon","link":"https://pokemon.fandom.com/es/wiki/Psyduck","type":[{"name":"Text"}],"tags":[{"_id":"1","name":"POKEMON"},{"_id":"2","name":"BEST"},{"_id":"3","name":"PSYDUCK"}],"description":"Psyduck says psy","image":"","markdown":"","createdAt":"2019-01-17T00:00:00.000Z","updatedAt":"2019-01-30T00:00:00.000Z"}],"isPublic":false,"color":"","createdAt":"2019-01-17T00:00:00.000Z","updatedAt":"2019-01-30T00:00:00.000Z"},{"_id":"2","name":"Answers","marks":[{"_id":"2","title":"How to exit Vim","link":"https://stackoverflow.com/questions/11828270/how-do-i-exit-the-vim-editor","type":[{"name":"Markdown"}],"tags":[{"_id":"4","name":"STACKOVERFLOW"},{"_id":"5","name":"VIM"}],"description":":p","image":"","markdown":"","createdAt":"2019-01-18T00:00:00.000Z","updatedAt":"2019-01-20T00:00:00.000Z"},{"_id":"3","title":"Superhuman","link":"https://es.ayuda.yahoo.com/kb/answers","type":[{"name":"Markdown"}],"tags":[{"_id":"6","name":"YAHOO"},{"_id":"7","name":"PHILOSOPHY"}],"description":"Yahoo Respuestas saved my life, now I am a superhuman","image":"","markdown":"","createdAt":"2019-01-16T00:00:00.000Z","updatedAt":"2019-01-20T00:00:00.000Z"}],"isPublic":false,"color":"","createdAt":"2019-01-17T00:00:00.000Z","updatedAt":"2019-01-30T00:00:00.000Z"}]}`)
    const editMark:Mark = {id:"3", title:"Philosophy",link:"https://es.ayuda.yahoo.com/kb/answers",type:"Text",tags:[{name:"YAHOO"},{name:"PHILOSOPHY"},{name:"NIETZSCHE"}],description:"Yahoo Respuestas saved my life, now I am a superhuman",image:"",markdown:"", createdAt:new Date("2019-01-16T00:00:00.000Z"),updatedAt:new Date("2019-01-20T00:00:00.000Z")}

    const actual:Mark = await markLocalRepository.edit(editMark)

    expect(actual).toEqual(MarkMother.textYahoo())
  })
})

describe('delete', () => {
  it('should delete a mark', async () => {
    const {storage, markLocalRepository} = setup()
    when(storage.getItem('folders')).thenReturn(`{"folders":[{"_id":"1","name":"Pokemon","marks":[{"_id":"1","title":"Best pokemon","link":"https://pokemon.fandom.com/es/wiki/Psyduck","type":[{"name":"Text"}],"tags":[{"_id":"1","name":"POKEMON"},{"_id":"2","name":"BEST"},{"_id":"3","name":"PSYDUCK"}],"description":"Psyduck says psy","image":"","markdown":"","createdAt":"2019-01-17T00:00:00.000Z","updatedAt":"2019-01-30T00:00:00.000Z"}],"isPublic":false,"color":"","createdAt":"2019-01-17T00:00:00.000Z","updatedAt":"2019-01-30T00:00:00.000Z"},{"_id":"2","name":"Answers","marks":[{"_id":"2","title":"How to exit Vim","link":"https://stackoverflow.com/questions/11828270/how-do-i-exit-the-vim-editor","type":[{"name":"Markdown"}],"tags":[{"_id":"4","name":"STACKOVERFLOW"},{"_id":"5","name":"VIM"}],"description":":p","image":"","markdown":"","createdAt":"2019-01-18T00:00:00.000Z","updatedAt":"2019-01-20T00:00:00.000Z"},{"_id":"3","title":"Philosophy","link":"https://es.ayuda.yahoo.com/kb/answers","type":[{"name":"Text"}],"tags":[{"_id":"6","name":"YAHOO"},{"_id":"7","name":"PHILOSOPHY"},{"_id":"8","name":"NIETZSCHE"}],"description":"Yahoo Respuestas saved my life, now I am a superhuman","image":"","markdown":"","createdAt":"2019-01-16T00:00:00.000Z","updatedAt":"2019-01-20T00:00:00.000Z"}],"isPublic":false,"color":"","createdAt":"2019-01-17T00:00:00.000Z","updatedAt":"2019-01-30T00:00:00.000Z"}]}`)
    const mark:Mark = {id:"3", title:"Philosophy",link:"https://es.ayuda.yahoo.com/kb/answers",type:"Text",tags:[{name:"YAHOO"},{name:"PHILOSOPHY"},{name:"NIETZSCHE"}],description:"Yahoo Respuestas saved my life, now I am a superhuman",image:"",markdown:"", createdAt:new Date("2019-01-16T00:00:00.000Z"),updatedAt:new Date("2019-01-20T00:00:00.000Z")}

    const actual = await markLocalRepository.delete(mark, "2")

    expect(actual).toEqual(1)
  })
})

describe('wrong mark delete', () => {
  it('should not delete a mark, returns 0', async () => {
    const {storage, markLocalRepository} = setup()
    when(storage.getItem('folders')).thenReturn(`{"folders":[{"_id":"1","name":"Pokemon","marks":[{"_id":"1","title":"Best pokemon","link":"https://pokemon.fandom.com/es/wiki/Psyduck","type":[{"name":"Text"}],"tags":[{"_id":"1","name":"POKEMON"},{"_id":"2","name":"BEST"},{"_id":"3","name":"PSYDUCK"}],"description":"Psyduck says psy","image":"","markdown":"","createdAt":"2019-01-17T00:00:00.000Z","updatedAt":"2019-01-30T00:00:00.000Z"}],"isPublic":false,"color":"","createdAt":"2019-01-17T00:00:00.000Z","updatedAt":"2019-01-30T00:00:00.000Z"},{"_id":"2","name":"Answers","marks":[{"_id":"2","title":"How to exit Vim","link":"https://stackoverflow.com/questions/11828270/how-do-i-exit-the-vim-editor","type":[{"name":"Markdown"}],"tags":[{"_id":"4","name":"STACKOVERFLOW"},{"_id":"5","name":"VIM"}],"description":":p","image":"","markdown":"","createdAt":"2019-01-18T00:00:00.000Z","updatedAt":"2019-01-20T00:00:00.000Z"},{"_id":"3","title":"Philosophy","link":"https://es.ayuda.yahoo.com/kb/answers","type":[{"name":"Text"}],"tags":[{"_id":"6","name":"YAHOO"},{"_id":"7","name":"PHILOSOPHY"},{"_id":"8","name":"NIETZSCHE"}],"description":"Yahoo Respuestas saved my life, now I am a superhuman","image":"","markdown":"","createdAt":"2019-01-16T00:00:00.000Z","updatedAt":"2019-01-20T00:00:00.000Z"}],"isPublic":false,"color":"","createdAt":"2019-01-17T00:00:00.000Z","updatedAt":"2019-01-30T00:00:00.000Z"}]}`)
    const mark:Mark = {id:"8", title:"Philosophy",link:"https://es.ayuda.yahoo.com/kb/answers",type:"Text",tags:[{name:"YAHOO"},{name:"PHILOSOPHY"},{name:"NIETZSCHE"}],description:"Yahoo Respuestas saved my life, now I am a superhuman",image:"",markdown:"", createdAt:new Date("2019-01-16T00:00:00.000Z"),updatedAt:new Date("2019-01-20T00:00:00.000Z")}

    const actual = await markLocalRepository.delete(mark, "2")

    expect(actual).toEqual(0)
  })
})

describe('create folder', () => {
  it('should create a folder', async () => {
    const {storage, markLocalRepository} = setup()
    when(storage.getItem('folders')).thenReturn(`{"folders":[{"_id":"1","name":"Pokemon","marks":[{"_id":"1","title":"Best pokemon","link":"https://pokemon.fandom.com/es/wiki/Psyduck","type":[{"name":"Text"}],"tags":[{"_id":"1","name":"POKEMON"},{"_id":"2","name":"BEST"},{"_id":"3","name":"PSYDUCK"}],"description":"Psyduck says psy","image":"","markdown":"","createdAt":"2019-01-17T00:00:00.000Z","updatedAt":"2019-01-30T00:00:00.000Z"}],"isPublic":false,"color":"","createdAt":"2019-01-17T00:00:00.000Z","updatedAt":"2019-01-30T00:00:00.000Z"}]}`)
    const createFolderDto:CreateFolderDto = {name:"Answers",isPublic:false,color:""}

    const actual:Folder = await markLocalRepository.createFolder(createFolderDto)

    actual.id = "2"
    actual.createdAt = new Date("2019-01-17T00:00:00.000Z")
    actual.updatedAt = new Date("2019-01-30T00:00:00.000Z")
    actual.marks.push(MarkMother.markdownVim(), MarkMother.textYahoo())

    expect(actual).toEqual(FolderMother.answers())
  })
})

describe('delete folder', () => {
  it('should delete a folder', async () => {
    const {storage, markLocalRepository} = setup()
    when(storage.getItem('folders')).thenReturn(`{"folders":[{"_id":"1","name":"Pokemon","marks":[{"_id":"1","title":"Best pokemon","link":"https://pokemon.fandom.com/es/wiki/Psyduck","type":[{"name":"Text"}],"tags":[{"_id":"1","name":"POKEMON"},{"_id":"2","name":"BEST"},{"_id":"3","name":"PSYDUCK"}],"description":"Psyduck says psy","image":"","markdown":"","createdAt":"2019-01-17T00:00:00.000Z","updatedAt":"2019-01-30T00:00:00.000Z"}],"isPublic":false,"color":"","createdAt":"2019-01-17T00:00:00.000Z","updatedAt":"2019-01-30T00:00:00.000Z"},{"_id":"2","name":"Answers","marks":[{"_id":"2","title":"How to exit Vim","link":"https://stackoverflow.com/questions/11828270/how-do-i-exit-the-vim-editor","type":[{"name":"Markdown"}],"tags":[{"_id":"4","name":"STACKOVERFLOW"},{"_id":"5","name":"VIM"}],"description":":p","image":"","markdown":"","createdAt":"2019-01-18T00:00:00.000Z","updatedAt":"2019-01-20T00:00:00.000Z"},{"_id":"3","title":"Philosophy","link":"https://es.ayuda.yahoo.com/kb/answers","type":[{"name":"Text"}],"tags":[{"_id":"6","name":"YAHOO"},{"_id":"7","name":"PHILOSOPHY"},{"_id":"8","name":"NIETZSCHE"}],"description":"Yahoo Respuestas saved my life, now I am a superhuman","image":"","markdown":"","createdAt":"2019-01-16T00:00:00.000Z","updatedAt":"2019-01-20T00:00:00.000Z"}],"isPublic":false,"color":"","createdAt":"2019-01-17T00:00:00.000Z","updatedAt":"2019-01-30T00:00:00.000Z"}]}`)
    const folder:Folder = {id:"2",name:"Answers",isPublic:false,color:"",marks:[MarkMother.markdownVim(),MarkMother.textYahoo()], createdAt: new Date("2019-01-17T00:00:00.000Z"), updatedAt: new Date("2019-01-30T00:00:00.000Z")}

    const actual = await markLocalRepository.deleteFolder(folder.id)

    expect(actual).toEqual(1)
  })
})

describe('wrong delete folder', () => {
  it('should not find the folder, returns 0', async () => {
    const {storage, markLocalRepository} = setup()
    when(storage.getItem('folders')).thenReturn(`{"folders":[{"_id":"1","name":"Pokemon","marks":[{"_id":"1","title":"Best pokemon","link":"https://pokemon.fandom.com/es/wiki/Psyduck","type":[{"name":"Text"}],"tags":[{"_id":"1","name":"POKEMON"},{"_id":"2","name":"BEST"},{"_id":"3","name":"PSYDUCK"}],"description":"Psyduck says psy","image":"","markdown":"","createdAt":"2019-01-17T00:00:00.000Z","updatedAt":"2019-01-30T00:00:00.000Z"}],"isPublic":false,"color":"","createdAt":"2019-01-17T00:00:00.000Z","updatedAt":"2019-01-30T00:00:00.000Z"},{"_id":"2","name":"Answers","marks":[{"_id":"2","title":"How to exit Vim","link":"https://stackoverflow.com/questions/11828270/how-do-i-exit-the-vim-editor","type":[{"name":"Markdown"}],"tags":[{"_id":"4","name":"STACKOVERFLOW"},{"_id":"5","name":"VIM"}],"description":":p","image":"","markdown":"","createdAt":"2019-01-18T00:00:00.000Z","updatedAt":"2019-01-20T00:00:00.000Z"},{"_id":"3","title":"Philosophy","link":"https://es.ayuda.yahoo.com/kb/answers","type":[{"name":"Text"}],"tags":[{"_id":"6","name":"YAHOO"},{"_id":"7","name":"PHILOSOPHY"},{"_id":"8","name":"NIETZSCHE"}],"description":"Yahoo Respuestas saved my life, now I am a superhuman","image":"","markdown":"","createdAt":"2019-01-16T00:00:00.000Z","updatedAt":"2019-01-20T00:00:00.000Z"}],"isPublic":false,"color":"","createdAt":"2019-01-17T00:00:00.000Z","updatedAt":"2019-01-30T00:00:00.000Z"}]}`)
    const folder:Folder = {id:"6",name:"Answers",isPublic:false,color:"",marks:[MarkMother.markdownVim(),MarkMother.textYahoo()], createdAt: new Date("2019-01-17T00:00:00.000Z"), updatedAt: new Date("2019-01-30T00:00:00.000Z")}

    const actual = await markLocalRepository.deleteFolder(folder.id)

    expect(actual).toEqual(0)
  })
})

function setup() {
  const storage = mock<Storage>()
  return {
    storage,
    markLocalRepository: new MarkLocalRepository(instance(storage), new FolderDtoToFolderMapper(new MarkDtoToMarkMapper(new TagDtoToTagMapper())), new FolderToFolderDtoMapper(new MarkToMarkDtoMapper(new TagToTagDtoMapper())), new CreateFolderDtoToFolderMapper(), new CreateMarkDtoToMarkMapper())
  }
}
