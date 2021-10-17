import {FC, useEffect, useState} from 'react'
import {Mark} from "../mark/mark";
import {CardContainer} from "../../../../core/components/card-container/card-container";
import {Folder} from "../../domain/folder/folder";
import {MarkRepositoryFactory} from "../../infrastructure/mark/mark-repository-factory";
import {GetFoldersUseCase} from "../../application/folder/get-folders-use-case";
import {CreateMark} from "../mark-create/mark-create";
import {CreateFolder} from "../folder-create/folder-create";
import {Button} from "../../../../core/components/button/button";
import {Modal} from "../../../../core/components/modal/modal";
import {bind} from "../../../../utils/bind";
import styles from './marks.module.css'
import {User} from "../../domain/user/user";
import {faExclamationCircle, faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const cx = bind(styles)

interface Props {
  user: User
  onUserAction(): void
}

export const Marks: FC<Props> = ({onUserAction}) => {

  const markRepository = MarkRepositoryFactory.build()
  const [folders, setFolders] = useState<Folder[]>([])
  const [currentFolder, setCurrentFolder] = useState("")
  const [isMarkModalOpen, setIsMarkModalOpen] = useState(false)
  const [isDeleteFolderModalOpen, setIsDeleteFolderModalOpen] = useState(false)
  const [deleteFolderID, setDeleteFolderID] = useState("")
  const [error, serError] = useState("")

  useEffect(() => {
    fetchMarks()
  }, [])

  async function fetchMarks() {
    const getFoldersUseCase = new GetFoldersUseCase(markRepository)
    const allFolders = await getFoldersUseCase.execute()
    setFolders(allFolders)
  }
  const isOneFolder = folders.length !== 0

  function onMarkCreated() {
    setIsMarkModalOpen(false)
    fetchMarks()
  }

  function onFolderCreated() {
    fetchMarks()
  }

  async function deleteFolder(id: string) {
    setIsDeleteFolderModalOpen(false)
    setDeleteFolderID("")
    const resultError = await markRepository.deleteFolder(id)
    if (resultError === '401') {
      serError("")
      onUserAction()
    }
    fetchMarks()
  }

  return (
    <main>
      <div className={cx("main-div")}>
        <CreateFolder markRepository={markRepository} onFolderCreated={() => onFolderCreated()} onUserAction={() => onUserAction()}/>
        {(error !== "") ? (<div className={cx("form-error")}><FontAwesomeIcon icon={faExclamationCircle} className={cx('exclamation-circle')}/><span>{error}</span></div>) : null}
        {isOneFolder ? (
          folders.map(folder => (
            <>
              <CardContainer key={folder.id} cardContainerName={folder.name} showDeleteModal={() => {
                setIsDeleteFolderModalOpen(true)
                setDeleteFolderID(folder.id)
              }} newMark={() => {
                setIsMarkModalOpen(true)
                setCurrentFolder(folder.id)
              }} >
                <div className={cx('card-list')}>
                {folder.marks.length !== 0 ? (
                  folder.marks.map(mark => (
                    <Mark key={mark.id} folderId={folder.id} onClick={() => {}} mark={mark} markRepository={markRepository} onMarkEditOrDelete={fetchMarks}>{mark.title}</Mark>
                  ))) : null
                }
                </div>
              </CardContainer>
            </>
            ))) : null
        }
        <CreateMark markRepository={markRepository} folderId={currentFolder} isModalOpened={isMarkModalOpen} onMarkCreated={() => onMarkCreated()} onModalReset={() => setIsMarkModalOpen(false)} onUserAction={() => onUserAction()}></CreateMark>
        <Modal isOpened={isDeleteFolderModalOpen} onExitModal={() => {setIsDeleteFolderModalOpen(false); setDeleteFolderID("")}}>
          <FontAwesomeIcon icon={faExclamationTriangle} className={cx('exclamation-triangle')}/>
          <div className={cx("folder-delete-modal")}>The folder will be deleted, including all bookmarks in the folder!</div>
          <Button theme={'primary'} onClick={()=>deleteFolder(deleteFolderID)}>Delete</Button>
        </Modal>
      </div>
    </main>
  )
}
