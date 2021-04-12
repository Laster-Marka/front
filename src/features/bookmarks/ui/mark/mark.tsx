import {Mark as MarkModel} from "../../domain/mark";
import {FC, useEffect, useState} from "react";
import {Card} from "../../../../core/components/card/card";
import {Modal} from "../../../../core/components/modal/modal";
import {Button} from "../../../../core/components/button/button";
import {MarkRepository} from "../../domain/mark-repository";

interface Props {
  onClick(): void
  mark: MarkModel
  markRepository: MarkRepository
  onMarkDeleted(): void
}

export const Mark: FC<Props> = ({ onClick, mark , markRepository, onMarkDeleted}) => {

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
  }, [isOpen])

  async function deleteMark() {
    await markRepository.delete(mark)
    onMarkDeleted()
  }

  return (
    <>
    <Card onClick={() => setIsOpen(true)}>
      <span>{mark.type}</span>
      <h4>{mark.title}</h4>
      <p>{mark.description}</p>

      <div onClick={onClick}>
        <span></span>
      </div>
      {mark.tags.map(tag => (
        <span>{tag}</span>
      ))}
    </Card>
  <Modal isOpened={isOpen} onExitModal={() => setIsOpen(false)}>
    <Button onClick={deleteMark}/>
    <span>{mark.type}</span>
    <h4>{mark.title}</h4>
    <p>{mark.description}</p>

    <div onClick={onClick}>
      <span></span>
    </div>
    {mark.tags.map(tag => (
      <span>{tag}</span>
    ))}
  </Modal>
  </>
  )
}
