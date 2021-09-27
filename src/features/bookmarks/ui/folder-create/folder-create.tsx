import {Modal} from "../../../../core/components/modal/modal";
import {Button} from "../../../../core/components/button/button";
import {MarkRepository} from "../../domain/mark/mark-repository";
import {FC, useState} from "react";
import {Folder} from "../../domain/folder/folder";
import {CreateFolderDto} from "../../infrastructure/folder/create-folder-dto";

interface Props {
  markRepository: MarkRepository
  onFolderCreated(folder: Folder): void
}

export const CreateFolder: FC<Props> = ({ markRepository, onFolderCreated}) => {

  const [titleText, setTitleText] = useState('')
  const [isModalOpened, setIsModalOpened] = useState(false)

  async function createFolder() {
    const folderCreate: CreateFolderDto = { name: titleText, isPublic: false, color:""}
    const newFolder = await markRepository.createFolder(folderCreate)
    resetModal()
    onFolderCreated(newFolder)
  }

return (
  <>
    <Button theme={"secondary"} onClick={() => setIsModalOpened(true)}>Create Folder</Button>
    <Modal isOpened={isModalOpened} onExitModal={resetModal}>
      <Button theme={"secondary"} onClick={cleanModal}/>
      <label>
        Title
        <input value={titleText} onChange={event => setTitleText(event.target.value)} />
      </label>
      <Button theme={"primary"} onClick={() => createFolder()}/>
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
