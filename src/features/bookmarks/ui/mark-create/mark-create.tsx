import {FC, useState} from "react";
import {Button} from "../../../../core/components/button/button";

interface Props {
  onCreate(todoText: string): void
}

export const MarkCreate: FC<Props> = ({ onCreate}) => {
  const [markText, setMarkText] = useState('')

  const clearTodo = () => setMarkText('')

  return (
    <form
      name="Create mark"
      onSubmit={event => {
        event.preventDefault()
        onCreate(markText)
        clearTodo()
      }}
    >
      <label>
        Mark
        <input value={markText} onChange={event => setMarkText(event.target.value)} />
      </label>
      <Button onClick={clearTodo}>Clear mark</Button>
      <Button theme={'primary'} submit>
        Create mark
      </Button>
    </form>
  )
}
