import {Mark as MarkModel} from "../../domain/mark";
import {FC, useEffect, useState} from "react";
import {Card} from "../../../../core/components/card/card";
import {Modal} from "../../../../core/components/modal/modal";

interface Props {
  onClick(): void
  mark: MarkModel
}

export const Mark: FC<Props> = ({ onClick, mark }) => {

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    console.log('hey')
  }, [isOpen])

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
