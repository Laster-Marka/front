import {FC, useState} from "react";
import {Button} from "../../../../core/components/button/button";
import {Modal} from "../../../../core/components/modal/modal";
import {Mark} from "../../domain/mark/mark";
import {MarkRepository} from "../../domain/mark/mark-repository";
import {CreateMarkDto} from "../../infrastructure/mark/create-mark-dto";
import Select from "react-select";
import {Type, typeOptions} from "../../domain/mark/type";
import {Tag as ReactTag, WithContext as ReactTags} from "react-tag-input"
import styles from "../mark-create/mark-create.module.css";
import {bind} from "../../../../utils/bind";

const cx = bind(styles)

interface Props {
  markRepository: MarkRepository
  folderId: string
  isModalOpened: boolean
  onMarkCreated(mark: Mark): void
  onModalReset(): void
}

export const CreateMark: FC<Props> = ({ markRepository , folderId, isModalOpened, onMarkCreated, onModalReset}) => {

  const [type, setType] = useState<Type>('Text')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [link, setLink] = useState('')
  const [tags, setTags] = useState<ReactTag[]>([])

  async function createMark(folderId: string) {
    const createMarkDto: CreateMarkDto = { title: title, link: link, type: type, tags: tags.map((tag)=> {return {name:tag.text}}), description: description, image: "", markdown: "" }
    const newMark = await markRepository.create(createMarkDto, folderId)
    resetModal()
    onMarkCreated(newMark)
  }

  const handleDrag = (tag:ReactTag, currPos:number, newPos:number) => {
    const newTags = [...tags].slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    setTags(newTags)
  }

  return (
    <Modal isOpened={isModalOpened} onExitModal={resetModal}>
      <div className={cx('mark-modal')}>
        <div className={cx('mark-modal-content')}>
          <Select className={cx('mark-modal-select')} isDisabled={false} isLoading={false} name={"markTypes"} onChange={event => {
            const comboOption: {value: Type, label: string} | undefined = typeOptions.find(option => option.value === event?.value)
            if(comboOption!==undefined){
              setType(comboOption.value)
            }
          }} options={typeOptions} defaultValue={typeOptions.find(option => option.value === 'Text')}/>
          <div className={cx('mark-modal-form-div')}>
            <label>Title</label>
            <input value={title} onChange={event => setTitle(event.target.value)}/>
          </div>
          <div className={cx('mark-modal-form-div')}>
            <label>Description</label>
            <input value={description} onChange={event => setDescription(event.target.value)}/>
          </div>
          <div className={cx('mark-modal-form-div')}>
            <label>Link</label>
            <input value={link} onChange={event => setLink(event.target.value)}/>
          </div>
          <div className={cx('ReactTags')}>
            <ReactTags tags={tags} allowUnique={true} handleAddition={(tag)=>{setTags([...tags,tag])}} allowDragDrop={true} handleDelete={(i)=>{// @ts-ignore
              setTags(tags.filter(( tag, index) => index !== i))}} handleDrag={handleDrag}></ReactTags>
          </div>
        </div>
        <div className={cx('mark-modal-create-button')}>
          <Button theme={"primary"} onClick={() => createMark(folderId)}>Create</Button>
        </div>
      </div>
    </Modal>
  )

  function resetModal() {
    cleanModal()
    onModalReset()
  }

  function cleanModal(){
    setTitle("")
    setLink("")
    setDescription("")
    setTags([])
  }
}
