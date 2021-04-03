import {Modal} from "./modal";
import {Button} from "../button/button";
import {FC, useState} from "react";

export default {
  title: 'Modal',
  component: Modal
}

export const Base: FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return(
    <div>
      <Modal isOpened={isOpen} onExitModal={()=>{}}/>
      <Button onClick={() => setIsOpen(true)}/>
    </div>
  )
}
