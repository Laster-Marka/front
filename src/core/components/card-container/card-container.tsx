import styles from './card-container.module.css'
import { FC } from 'react'
import {bind} from "../../../utils/bind";
import {Button} from "../button/button";

interface Props {
  cardContainerName: string
  onButtonClicked(): void
}

const cx = bind(styles)

export const CardContainer: FC<Props> = ({ children , onButtonClicked, cardContainerName}) => {

  return <div className={cx('card-container')}>
    <div className={cx('card-container-shape')}>
      <h3 className={cx('card-title')}>{cardContainerName}</h3>
      <Button className={cx('card-button')} onClick={onButtonClicked}>+</Button>
    </div>
    {children}
  </div>
}
