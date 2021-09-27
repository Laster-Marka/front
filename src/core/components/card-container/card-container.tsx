import styles from './card-container.module.css'
import { FC } from 'react'
import {bind} from "../../../utils/bind";
import {Button} from "../button/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface Props {
  cardContainerName: string
  newMark(): void
  showDeleteModal(): void
}

const cx = bind(styles)

export const CardContainer: FC<Props> = ({ children , newMark, showDeleteModal, cardContainerName}) => {

  return <div className={cx('card-container')}>
    <div className={cx('card-container-shape')}>
      <FontAwesomeIcon icon={faTrash} className={cx('trash-color')} onClick={() => showDeleteModal()} />
      <h3 className={cx('card-title')}>{cardContainerName}</h3>
      <Button className={cx('card-button')} onClick={newMark}>+</Button>
    </div>
    {children}
  </div>
}
