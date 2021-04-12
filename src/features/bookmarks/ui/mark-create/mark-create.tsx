import {FC, useState} from "react";
import {Button} from "../../../../core/components/button/button";
import {Modal} from "../../../../core/components/modal/modal";
import {Mark} from "../../domain/mark";
import {MarkRepository} from "../../domain/mark-repository";

interface Props {
  markRepository: MarkRepository
  folderId: number
  isModalOpened: boolean
  onMarkCreated(mark: Mark): void
  onModalReset(): void
}

export const CreateMark: FC<Props> = ({ markRepository , folderId, isModalOpened, onMarkCreated, onModalReset}) => {

  const [titleText, setTitleText] = useState('')
  const [linkText, setLinkText] = useState('')
  const [descriptionText, setDescriptionText] = useState('')
  const [tagText, setTagText] = useState('')
  const [tags, setTags] = useState<string[]>([])

  async function createMark(folderId: number) {
    const newMark: Mark = { id: Math.random() * 1000, folder: folderId, title: titleText, link: linkText, type: 'Text', tags: tags, description: descriptionText, createdAt: new Date(Date.now()), updatedAt: new Date(Date.now()) }
    await markRepository.create(newMark)
    resetModal()
    onMarkCreated(newMark)
  }

  return (
    <Modal isOpened={isModalOpened} onExitModal={resetModal}>
      <Button theme={"secondary"} onClick={cleanModal}/>
      <form>
        <label>
          Title
          <input value={titleText} onChange={event => setTitleText(event.target.value)} />
        </label>
        <label>
          Type
          <select>
            <option defaultValue='Text'>Text</option>
            <option value='Image'>Image</option>
            <option value='Video'>Video</option>
            <option value='Markdown'>Markdown</option>
          </select>
        </label>
        <label>
          Link
          <input value={linkText} onChange={event => setLinkText(event.target.value)} />
        </label>
        <label>
          Description
          <textarea value={descriptionText} onChange={event => setDescriptionText(event.target.value)}></textarea>
        </label>
        <label>
          Add Tags
          <input value={tagText} onChange={event => setTagText(event.target.value)} />
          <Button theme={"secondary"} onClick={() => {setTags([...tags, tagText])}}/>
        </label>
        {tags.length ? tags.map(tag => (
          <span>{tag}&nbsp</span>
        )) : null}

        <Button theme={"primary"} onClick={() => createMark(folderId)}/>
      </form>
    </Modal>
  )

  function resetModal() {
    cleanModal()
    onModalReset()
  }

  function cleanModal(){
    setTitleText("")
    setLinkText("")
    setDescriptionText("")
    setTagText("")
    setTags([])
  }
}
