import {FC, useEffect, useState} from 'react'
import {Mark} from "../mark/mark";
import {Mark as MarkModel} from "../../domain/mark/mark";
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

const cx = bind(styles)

interface Props {
  user: User
  onUserAction(): void
}

export const Marks: FC<Props> = () => {

  const markRepository = MarkRepositoryFactory.build()
  // const [marks, setMarks] = useState<MarkModel[]>([])
  const [folders, setFolders] = useState<Folder[]>([])
  const [currentFolder, setCurrentFolder] = useState("")
  const [isMarkModalOpen, setIsMarkModalOpen] = useState(false)
  const [isDeleteFolderModalOpen, setIsDeleteFolderModalOpen] = useState(false)
  const [deleteFolderID, setDeleteFolderID] = useState("")

  useEffect(() => {
    fetchMarks()
  }, [])

  async function fetchMarks() {
    const getFoldersUseCase = new GetFoldersUseCase(markRepository)
    const allFolders = await getFoldersUseCase.execute()
    // const getMarksUseCase = new GetMarksUseCase(markRepository)
    // const allMarks = await getMarksUseCase.execute()

    setFolders(allFolders)
    // setMarks(allMarks)
  }
  const isOneFolder = folders.length !== 0

  function onMarkCreated(newMark: MarkModel, folders: Folder[], folderId: string) {
    setIsMarkModalOpen(false)
    const markFolderIndex = folders.findIndex(i => i.id === folderId)
    folders[markFolderIndex].marks.push(newMark)
    setFolders(folders)
    fetchMarks()
  }

  function onFolderCreated(newFolder: Folder) {
    setFolders([...folders, newFolder])
    fetchMarks()
  }

  async function deleteFolder(id: string) {
    setIsDeleteFolderModalOpen(false)
    setDeleteFolderID("")
    await markRepository.deleteFolder(id)
    fetchMarks()
  }

  return (
    <main>
      <div className={cx("main-div")}>
        <CreateFolder markRepository={markRepository} onFolderCreated={(newFolder) => onFolderCreated(newFolder)}/>
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
                {folder.marks.length !== 0 ? (
                  folder.marks.map(mark => (
                    <Mark key={mark.id} folderId={folder.id} onClick={() => {}} mark={mark} markRepository={markRepository} onMarkEditOrDelete={fetchMarks}>{mark.title}</Mark>
                  ))) : (<span>Empty Folder</span>)
                }
              </CardContainer>
            </>
            ))) : (<span>No Folders</span>)
        }
        <CreateMark markRepository={markRepository} folderId={currentFolder} isModalOpened={isMarkModalOpen} onMarkCreated={(newMark) => onMarkCreated(newMark, folders, currentFolder)} onModalReset={() => setIsMarkModalOpen(false)}></CreateMark>
        <Modal isOpened={isDeleteFolderModalOpen} onExitModal={() => {setIsDeleteFolderModalOpen(false); setDeleteFolderID("")}}>
          <div className="alert alert-danger">The folder will be deleted, including all bookmarks in the folder</div>
          <Button onClick={()=>deleteFolder(deleteFolderID)}/>
        </Modal>
      </div>
    </main>
  )
}
