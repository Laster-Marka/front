import styles from './card.module.css'
import { FC } from 'react'
import {bind} from "../../../utils/bind";

const cx = bind(styles)

interface Props {
  onClick(): void
}

export const Card: FC<Props> = ({ onClick, children}) => {
  return <div onClick={onClick} className={cx('card')}>{children}</div>
}
