import {FC, useEffect, useState} from 'react'
import {Mark} from "../mark/mark";
import {Mark as MarkModel} from "../../domain/mark";
import {CardContainer} from "../../../../core/components/card-container/card-container";
import {Folder} from "../../domain/folder";
import {MarkRepositoryFactory} from "../../infrastructure/mark/mark-repository-factory";
import {GetFoldersUseCase} from "../../application/folder/get-folders-use-case";
import {GetMarksUseCase} from "../../application/mark/get-marks-use-case";
import {CreateMark} from "../mark-create/mark-create";
import {CreateFolder} from "../folder-create/folder-create";

export const Marks: FC = () => {

  const markRepository = MarkRepositoryFactory.buildLocal()
  const [marks, setMarks] = useState<MarkModel[]>([])
  const [folders, setFolders] = useState<Folder[]>([])
  const [currentFolder, setCurrentFolder] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetchMarks()
  }, [])

  async function fetchMarks() {
    const getFoldersUseCase = new GetFoldersUseCase(markRepository)
    const allFolders = await getFoldersUseCase.execute()
    const getMarksUseCase = new GetMarksUseCase(markRepository)
    const allMarks = await getMarksUseCase.execute()

    setFolders(allFolders)
    setMarks(allMarks)
  }
  const isNotEmpty = marks.length !== 0

  function onMarkCreated(newMark: MarkModel) {
    setIsModalOpen(false)
    setMarks([...marks, newMark])
    fetchMarks()
  }

  function onFolderCreated(newFolder: Folder) {
    setFolders([...folders, newFolder])
    fetchMarks()
  }

  return (
    <main>
      <CreateFolder markRepository={markRepository} onFolderCreated={(newFolder) => onFolderCreated(newFolder)}/>
      {folders.map(folder => (
        <CardContainer key={folder.id} cardContainerName={folder.title} onButtonClicked={() => {
          setIsModalOpen(true)
          setCurrentFolder(folder.id)
        }} >
          {isNotEmpty ? (
            marks.filter(mark => mark.folder === folder.id).map(mark => (
            <Mark key={mark.id} onClick={() => {}} mark={mark} markRepository={markRepository} onMarkDeleted={fetchMarks}>{mark.title}</Mark>
          ))) : (<span>Empty Folder</span>)
          }
        </CardContainer>
      ))}
      <CreateMark markRepository={markRepository} folderId={currentFolder} isModalOpened={isModalOpen} onMarkCreated={(newMark) => onMarkCreated(newMark)} onModalReset={() => setIsModalOpen(false)}></CreateMark>
    </main>
  )
}
