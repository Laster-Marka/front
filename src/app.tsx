import './app.css'
import {FC, useEffect, useState} from 'react'
import { Marks } from './features/bookmarks/ui/marks/marks'
import {Header} from "./features/bookmarks/ui/header/header";
import {MarkRepositoryFactory} from "./features/bookmarks/infrastructure/mark/mark-repository-factory";
import {Mark} from "./features/bookmarks/domain/mark";
import {GetMarksUseCase} from "./features/bookmarks/application/mark/get-marks-use-case";
import {Button} from "./core/components/button/button";

export const App: FC = () => {
  const markRepository = MarkRepositoryFactory.buildLocal()
  const [marks, setMarks] = useState<Mark[]>([])

  useEffect(() => {
    fetchMarks()
  }, [])

  async function fetchMarks() {
    const getTodosUseCase = new GetMarksUseCase(markRepository)
    const marks = await getTodosUseCase.execute()
    setMarks(marks)
  }

  async function createMark() {
    const newMark: Mark = { id: Math.random() * 1000, folder: 1, title: "New", link: 'http//', type: 'Text', tags: ['new', 'mark'], description: 'This is a new mark', date: new Date("2019-01-19") }
    await markRepository.create(newMark)
    setMarks([...marks, newMark])
    fetchMarks()
  }

  return (
    <>
      <Header />
      <Marks marks={marks}/>
      <Button onClick={createMark}>Create Mark</Button>
    </>
    )

}
