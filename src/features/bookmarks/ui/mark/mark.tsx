import {Mark as MarkModel} from "../../domain/mark/mark";
import {FC, useEffect, useState} from "react";
import {Card} from "../../../../core/components/card/card";
import {Modal} from "../../../../core/components/modal/modal";
import {Button} from "../../../../core/components/button/button";
import {MarkRepository} from "../../domain/mark/mark-repository";
import Select from "react-select";
import {Type, typeOptions} from "../../domain/mark/type";
import {Tag as ReactTag, WithContext as ReactTags} from 'react-tag-input';
import styles from "../../../../core/components/tags/tags.module.css";
import {bind} from "../../../../utils/bind";

const cx = bind(styles)

interface Props {
  onClick(): void
  mark: MarkModel
  markRepository: MarkRepository
  folderId: string
  onMarkEditOrDelete(): void
}

export const Mark: FC<Props> = ({ onClick, mark , markRepository, folderId, onMarkEditOrDelete}) => {

  const [isOpen, setIsOpen] = useState(false)
  const [isTitleDisable, setIsTitleDisable] = useState(true)
  const [isDescriptionDisable, setIsDescriptionDisable] = useState(true)
  const [isLinkEditable, setIsLinkEditable] = useState(false)
  const [isMarkEditable, setIsMarkEditable] = useState(false)

  const [type, setType] = useState<Type>(mark.type)
  const [title, setTitle] = useState(mark.title)
  const [description, setDescription] = useState(mark.description)
  const [link, setLink] = useState(mark.link)
  const [tags, setTags] = useState<ReactTag[]>(mark.tags.map((tag)=> {return{id:tag.name,text:tag.name}}))


  useEffect(() => {
  }, [isOpen])

  async function deleteMark() {
    await markRepository.delete(mark, folderId)
    onMarkEditOrDelete()
  }

  function resetEditModal() {
    setIsTitleDisable(true)
    setIsDescriptionDisable(true)
    setIsLinkEditable(false)
    setIsMarkEditable(false)
  }

  async function saveMark() {
    mark.type = type
    mark.title = title
    mark.description = description
    mark.link = link
    mark.tags = tags.map((tag)=> {return {name:tag.text}})
    await markRepository.edit(mark, folderId)
    resetEditModal()
    onMarkEditOrDelete()
  }

  function cancelSaveMark() {
    setType(mark.type)
    setTitle(mark.title)
    setDescription(mark.description)
    setLink(mark.link)
    setTags(mark.tags.map((tag)=> {return{id:tag.name,text:tag.name}}))
    resetEditModal()
  }

  const handleDrag = (tag:ReactTag, currPos:number, newPos:number) => {
    const newTags = [...tags].slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    setTags(newTags)
    setIsMarkEditable(true)
  }

  let linkElement:JSX.Element=<div><a href={link} target={"_blank"}>{link}</a><Button onClick={()=>{setIsLinkEditable(true); setIsMarkEditable(true)}}/></div>
  if(isLinkEditable) {linkElement=<input value={link} onChange={event => setLink(event.target.value)}/>}

  return (
    <>
    <Card onClick={() => setIsOpen(true)}>
      <span>{mark.type}</span>
      <h4>{mark.title}</h4>
      <p>{mark.description}</p>

      <div onClick={onClick}>
        <span></span>
      </div>
    </Card>
  <Modal isOpened={isOpen} onExitModal={() => setIsOpen(false)}>
    <Button onClick={deleteMark}/>
    <Select isDisabled={false} isLoading={false} name={"markTypes"} onChange={event => {
        const comboOption: {value: Type, label: string} | undefined = typeOptions.find(option => option.value === event?.value)
        if(comboOption!==undefined){
          setType(comboOption.value)
          setIsMarkEditable(true)
        }
      }} options={typeOptions} defaultValue={typeOptions.find(option => option.value === mark.type)}/>
    <div onClick={() => {setIsTitleDisable( false); setIsMarkEditable( true)}}>
      <input value={title} onChange={event => setTitle(event.target.value)} disabled={isTitleDisable}/>
    </div>
    <div onClick={() => {setIsDescriptionDisable( false); setIsMarkEditable( true)}}>
      <input value={description} onChange={event => setDescription(event.target.value)} disabled={isDescriptionDisable}/>
    </div>
    {linkElement}
    <div className={cx('ReactTags')}>
      <ReactTags tags={tags} allowUnique={true} handleAddition={(tag)=>{setTags([...tags,tag]); setIsMarkEditable(true)}} allowDragDrop={true} handleDelete={(i)=>{// @ts-ignore
        setTags(tags.filter(( tag, index) => index !== i)); setIsMarkEditable(true)}} handleDrag={handleDrag}></ReactTags>
    </div>
    {isMarkEditable?
      <div>
        <Button theme={"primary"} onClick={saveMark}>Save</Button>
        <Button theme={"primary"} onClick={cancelSaveMark}>Cancel</Button>
      </div>:null
    }
  </Modal>
  </>
  )
}
