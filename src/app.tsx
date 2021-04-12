import './app.css'
import {FC} from 'react'
import { Marks } from './features/bookmarks/ui/marks/marks'
import {Header} from "./features/bookmarks/ui/header/header";

export const App: FC = () => {

  return (
    <>
      <Header />
      <Marks />
    </>
    )

}
