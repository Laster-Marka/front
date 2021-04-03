import styles from './card-container.module.css'
import { FC } from 'react'
import {bind} from "../../../utils/bind";

const cx = bind(styles)

export const CardContainer: FC = ({ children }) => {
  return <div className={cx('card-container')}>
    <div className={cx('card-container-shape')}>Folder Name</div>
    {children}
  </div>
}
