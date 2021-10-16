import { FC } from 'react'
import {Button} from "../../../../core/components/button/button";
import {bind} from "../../../../utils/bind";
import styles from './header.module.css'
import {User} from "../../domain/user/user";
import {UserRepository} from "../../domain/user/user-repository";

const cx = bind(styles)

interface Props {
  user: User
  userRepository: UserRepository
  onUserAction(): void
  onLogOutAction(): void
}

export const Header: FC<Props> = ({user, userRepository, onUserAction, onLogOutAction}) => {

  async function logOut() {
    await userRepository.logOut()
    onLogOutAction()
    onUserAction()
  }

  return (
    <header className={cx('navbar')}>
      <nav className={cx('navbar__left')}>
        <img src={"./logo_v3.PNG"} className={cx('navbar__logo')}></img>
      </nav>
      {/*//TODO: Future functionality <input type="search" placeholder="Search" className={cx('navbar__search')}/>*/}
      <h2 className={cx('title')}>LASTER-MARKA</h2>
      <nav className={cx('navbar__right')}>
        {/*//TODO: Future functionality <Button className={cx('primary')}>Config</Button>*/}
        <Button name={user.name} theme={'primary'} onClick={() => logOut()}>Logout</Button>
      </nav>
    </header>
  )
}
