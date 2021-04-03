import { FC } from 'react'
import {Button} from "../../../../core/components/button/button";
import {bind} from "../../../../utils/bind";

import styles from './header.module.css'

const cx = bind(styles)

export const Header: FC = () => {

  return (
    <header className={cx('navbar')}>
      <img src={"./logo.png"} className={cx('navbar__logo')}></img>
      <input type="search" placeholder="Search" className={cx('navbar__search')}/>
      <nav className={cx('navbar__right')}>
        <Button className={cx('primary')}>Config</Button>
        <Button className={cx('primary')}>Login</Button>
      </nav>
    </header>
  )
}
