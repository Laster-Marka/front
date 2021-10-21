import { ChangeEvent, FC, useState } from 'react'
import { Button } from '../../../../core/components/button/button'
import { Modal } from '../../../../core/components/modal/modal'
import { bind } from '../../../../utils/bind'
import styles from './login.module.css'
import { UserRepository } from '../../domain/user/user-repository'
import { UserLogin } from '../../domain/user/user-login'
import { UserRegister } from '../../domain/user/user-register'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const cx = bind(styles)

interface Props {
  userRepository: UserRepository
  onUserAction(): void
}

export const Login: FC<Props> = ({ userRepository, onUserAction }) => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)

  const [loginEmail, setLoginEmail] = useState<string>('')
  const [loginPassword, setLoginPassword] = useState<string>('')
  const [registerEmail, setRegisterEmail] = useState<string>('')
  const [registerName, setRegisterName] = useState<string>('')
  const [registerPassword, setRegisterPassword] = useState<string>('')
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState<string>('')

  const [loginError, setLoginError] = useState<string>('')
  const [registerError, setRegisterError] = useState<string>('')

  async function loginSubmitHandler(e: ChangeEvent<HTMLFormElement>) {
    setLoginError('')
    setRegisterError('')
    e.preventDefault()
    const user: UserLogin = { email: loginEmail, password: loginPassword }
    const resultError = await userRepository.logIn(user)
    if (resultError) {
      setLoginError(resultError)
      return
    }
    onUserAction()
  }
  async function registerSubmitHandler(e: ChangeEvent<HTMLFormElement>) {
    setLoginError('')
    setRegisterError('')
    e.preventDefault()
    const user: UserRegister = {
      email: registerEmail,
      name: registerName,
      password: registerPassword,
      confirmPassword: registerConfirmPassword,
    }
    const resultError = await userRepository.signUp(user)
    if (resultError) {
      setRegisterError(resultError)
      return
    }
    setIsRegisterModalOpen(false)
    onUserAction()
  }

  return (
    <>
      <div className={cx('login-container')}>
        <form onSubmit={loginSubmitHandler}>
          <div className={cx('form-inner')}>
            <h2 className={cx('title')}>LASTER-MARKA</h2>
            {loginError !== '' ? (
              <div className={cx('form-error')}>
                <FontAwesomeIcon icon={faExclamationCircle} className={cx('exclamation-circle')} />
                <span>{loginError}</span>
              </div>
            ) : null}
            <div className={cx('form-group')}>
              <label>Email</label>
              <input
                type={'email'}
                required={true}
                value={loginEmail}
                onChange={event => setLoginEmail(event.target.value)}
              />
            </div>
            <div className={cx('form-group', 'pass-margin')}>
              <label>Password</label>
              <input
                type={'password'}
                required={true}
                value={loginPassword}
                onChange={event => setLoginPassword(event.target.value)}
              />
            </div>
            <div className={cx('login-buttons')}>
              <input type={'submit'} className={cx('input-submit')} value={'Login'} />
              <Button theme={'primary'} onClick={() => setIsRegisterModalOpen(true)}>
                Register
              </Button>
            </div>
          </div>
        </form>
      </div>
      <Modal isOpened={isRegisterModalOpen} onExitModal={() => setIsRegisterModalOpen(false)}>
        <div className={cx('register-modal')}>
          <div className={cx('register-modal-content')}>
            <form onSubmit={registerSubmitHandler}>
              {registerError !== '' ? (
                <div className={cx('form-error')}>
                  <FontAwesomeIcon
                    icon={faExclamationCircle}
                    className={cx('exclamation-circle')}
                  />
                  <span>{registerError}</span>
                </div>
              ) : null}
              <div className={cx('form-group', 'register-modal-form-div')}>
                <label>Email</label>
                <input
                  type={'email'}
                  required={true}
                  value={registerEmail}
                  onChange={event => setRegisterEmail(event.target.value)}
                />
              </div>
              <div className={cx('form-group', 'register-modal-form-div')}>
                <label>Name</label>
                <input
                  type={'text'}
                  required={true}
                  value={registerName}
                  onChange={event => setRegisterName(event.target.value)}
                />
              </div>
              <div className={cx('form-group', 'register-modal-form-div')}>
                <label>Password</label>
                <input
                  type={'password'}
                  required={true}
                  value={registerPassword}
                  onChange={event => setRegisterPassword(event.target.value)}
                />
              </div>
              <div className={cx('form-group', 'register-modal-form-div')}>
                <label>Confirm Password</label>
                <input
                  type={'password'}
                  required={true}
                  value={registerConfirmPassword}
                  onChange={event => setRegisterConfirmPassword(event.target.value)}
                />
              </div>
              <div className={cx('register-modal-button')}>
                <input type={'submit'} className={cx('input-submit')} value={'Register'} />
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  )
}
