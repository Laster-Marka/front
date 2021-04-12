import {Modal} from "../../../../core/components/modal/modal";
import {Button} from "../../../../core/components/button/button";
import {MarkRepository} from "../../domain/mark-repository";
import {FC, useState} from "react";
import {Folder} from "../../domain/folder";

interface Props {
  markRepository: MarkRepository
  onFolderCreated(folder: Folder): void
}

export const CreateFolder: FC<Props> = ({ markRepository, onFolderCreated}) => {

  const [titleText, setTitleText] = useState('')
  const [isModalOpened, setIsModalOpened] = useState(false)

  async function createFolder() {
    const newFolder: Folder = { id: Math.random() * 1000, title: titleText, createdAt: new Date(Date.now()), updatedAt: new Date(Date.now())}
    await markRepository.createFolder(newFolder)
    resetModal()
    onFolderCreated(newFolder)
  }

return (
  <>
    <Button theme={"secondary"} onClick={() => setIsModalOpened(true)}>Create Folder</Button>
    <Modal isOpened={isModalOpened} onExitModal={resetModal}>
      <Button theme={"secondary"} onClick={cleanModal}/>
      <form>
        <label>
          Title
          <input value={titleText} onChange={event => setTitleText(event.target.value)} />
        </label>
        <Button theme={"primary"} onClick={() => createFolder()}/>
      </form>
    </Modal>
  </>
)
  function resetModal() {
    cleanModal()
    setIsModalOpened(false)
  }

  function cleanModal(){
    setTitleText("")
  }
}
