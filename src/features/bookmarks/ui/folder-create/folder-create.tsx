import {Modal} from "../../../../core/components/modal/modal";
import {Button} from "../../../../core/components/button/button";
import {MarkRepository} from "../../domain/mark/mark-repository";
import {FC, useState} from "react";
import {CreateFolderDto} from "../../infrastructure/folder/create-folder-dto";
import {bind} from "../../../../utils/bind";
import styles from './folder-create.module.css'
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const cx = bind(styles)

interface Props {
  markRepository: MarkRepository
  onFolderCreated(): void
  onUserAction(): void
}

export const CreateFolder: FC<Props> = ({ markRepository, onFolderCreated, onUserAction}) => {

  const [titleText, setTitleText] = useState('')
  const [isModalOpened, setIsModalOpened] = useState(false)
  const [error, setError] = useState("")

  async function createFolder() {
    const folderCreate: CreateFolderDto = { name: titleText, isPublic: false, color:""}
    const resultError = await markRepository.createFolder(folderCreate)
    if (resultError === '401') {
      onUserAction()
    } else if (resultError) {
      setError(resultError)
    }
    resetModal()
    onFolderCreated()
  }

return (
  <>
    <Button className={cx("folder-create-button")} theme={"primary"} onClick={() => setIsModalOpened(true)}>New Folder</Button>
    <Modal isOpened={isModalOpened} onExitModal={resetModal}>
      {(error !== "") ? (<div className={cx("form-error")}><FontAwesomeIcon icon={faExclamationCircle} className={cx('exclamation-circle')}/><span>{error}</span></div>) : null}
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
