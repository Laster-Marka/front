import {FC, useCallback, useEffect, useRef, useState} from 'react';
import {bind} from "../../../utils/bind";
import styles from "./modal.module.css";

const cx = bind(styles)

export interface Props{
  isOpened: boolean
  onExitModal(): void
}

export const Modal: FC<Props> = ({ children, isOpened, onExitModal }) => {
  const [isOpen, setIsOpen] = useState(isOpened)

  const close = useCallback(() => {
    setIsOpen(false)
    onExitModal()
  }, [])

  const modalRef = useRef<HTMLDivElement>(null);

  const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (modalRef.current === e.target) {
      close()
    }
  }

  const handleEscape = useCallback(event => {
    if (event.keyCode === 27) close()
  }, [])

  useEffect(() => {
    if (isOpen) document.addEventListener('keydown', handleEscape, false)
    return () => {
      document.removeEventListener('keydown', handleEscape, false)
    }
  }, [handleEscape, isOpen])

  return(
    isOpened ? (
      <div className={cx('background')} onClick={closeModal} ref={modalRef}>
        <div className={cx('modal')}>
          <span role="button" className={cx('close')} aria-label="close" onClick={close}>
            x
          </span>
          <div className={cx('modal-content')}>{children}</div>
        </div>
      </div>
    ) : null
  )
}
