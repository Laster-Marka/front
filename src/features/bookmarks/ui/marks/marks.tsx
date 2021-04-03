import { FC } from 'react'
import {Mark} from "../mark/mark";
import {Mark as MarkModel} from "../../domain/mark";
import {Button} from "../../../../core/components/button/button";
import {CardContainer} from "../../../../core/components/card-container/card-container";

export const Marks: FC<{ marks: MarkModel[] }> = ({marks}) => {

  const isNotEmpty = marks.length !== 0

  return (
    <main>
      <h1>Marks</h1>
      <CardContainer>
        {isNotEmpty ? (
          marks.map(mark => (
          <Mark key={mark.id} onClick={() => {}} mark={mark}>{mark.title}</Mark>
        ))) : (<span>Empty Folder</span>)
        }
      </CardContainer>
      <Button theme={"secondary"}>Clear mark</Button>
    </main>
  )
}
