import {Modal} from "../../../../core/components/modal/modal";
import {Button} from "../../../../core/components/button/button";
import {MarkRepository} from "../../domain/mark/mark-repository";
import {FC, useState} from "react";
import {Folder} from "../../domain/folder/folder";
import {CreateFolderDto} from "../../infrastructure/folder/create-folder-dto";
import {bind} from "../../../../utils/bind";
import styles from './folder-create.module.css'

const cx = bind(styles)

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
    <Button className={cx("folder-create-button")} theme={"primary"} onClick={() => setIsModalOpened(true)}>New Folder</Button>
    <Modal isOpened={isModalOpened} onExitModal={resetModal}>
      <div className={cx("folder-modal-form-div")} >
        <label>Title</label>
        <input value={titleText} onChange={event => setTitleText(event.target.value)} />
      </div>
      <Button theme={"primary"} onClick={() => createFolder()}>Create</Button>
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
