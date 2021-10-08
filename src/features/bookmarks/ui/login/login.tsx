import {ChangeEvent, FC, useState} from 'react'
import {Button} from "../../../../core/components/button/button";
import {Modal} from "../../../../core/components/modal/modal";
import {bind} from "../../../../utils/bind";
import styles from './login.module.css'
import {UserRepository} from "../../domain/user/user-repository";
import {UserLogin} from "../../domain/user/user-login";
import {UserRegister} from "../../domain/user/user-register";

const cx = bind(styles)

interface Props {
  userRepository: UserRepository
  onUserAction(): void
}

export const Login: FC<Props> = ({userRepository, onUserAction}) => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)

  const [loginEmail, setLoginEmail] = useState<string>("")
  const [loginPassword, setLoginPassword] = useState<string>("")
  const [registerEmail, setRegisterEmail] = useState<string>("")
  const [registerName, setRegisterName] = useState<string>("")
  const [registerPassword, setRegisterPassword] = useState<string>("")
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState<string>("")

  const [loginError, setLoginError] = useState<string>("")
  const [registerError, setRegisterError] = useState<string>("")

  async function loginSubmitHandler(e:ChangeEvent<HTMLFormElement>) {
    setLoginError("")
    e.preventDefault()
    const user: UserLogin = {email: loginEmail, password: loginPassword}
    const cookie = await userRepository.logIn(user)
    console.log(cookie)
    onUserAction()
  }
  async function registerSubmitHandler(e:ChangeEvent<HTMLFormElement>) {
    setRegisterError("")
    e.preventDefault()
    const user: UserRegister = {email: registerEmail, name: registerName, password: registerPassword, confirmPassword: registerConfirmPassword}
    const result = await userRepository.signUp(user)
    console.log(result)
    onUserAction()
  }

  return (
    <>
    <form onSubmit={loginSubmitHandler}>
      <div className={cx("form-inner")}>
        <h2>Login</h2>
        {(loginError !== "") ? (<div className={"form-error"}>{loginError}</div>) : null}
        <div className="form-group">
          <label>Email</label>
          <input type={"email"} required={true} value={loginEmail} onChange={event => setLoginEmail(event.target.value)} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type={"password"} required={true} value={loginPassword} onChange={event => setLoginPassword(event.target.value)}/>
        </div>
        <div>
          <input type={"submit"} className={cx("input-submit")} value={"LOGIN"}/>
          <Button theme={"primary"} onClick={()=>setIsRegisterModalOpen(true)}>Register</Button>
        </div>
      </div>
    </form>
    <Modal isOpened={isRegisterModalOpen} onExitModal={() => setIsRegisterModalOpen(false)}>
      <form onSubmit={registerSubmitHandler}>
        <h2>Register</h2>
        {(registerError !== "") ? (<div className={"form-error"}>{registerError}</div>) : null}
        <div className="form-group">
          <label>Email</label>
          <input type={"email"} required={true} value={registerEmail} onChange={event => setRegisterEmail(event.target.value)} />
        </div>
        <div className="form-group">
          <label>Name</label>
          <input type={"text"} required={true} value={registerName} onChange={event => setRegisterName(event.target.value)} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type={"password"} required={true} value={registerPassword} onChange={event => setRegisterPassword(event.target.value)}/>
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input type={"password"} required={true} value={registerConfirmPassword} onChange={event => setRegisterConfirmPassword(event.target.value)}/>
        </div>
        <div>
          <input type={"submit"} className={cx("input-submit")} value={"Register"}/>
        </div>
      </form>
    </Modal>
  </>
  )
}
