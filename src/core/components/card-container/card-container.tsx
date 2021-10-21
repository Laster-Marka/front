import styles from './card-container.module.css'
import { FC } from 'react'
import { bind } from '../../../utils/bind'
import { Button } from '../button/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faTrash } from '@fortawesome/free-solid-svg-icons'

interface Props {
  cardContainerName: string
  newMark(): void
  showDeleteModal(): void
}

const cx = bind(styles)

export const CardContainer: FC<Props> = ({
  children,
  newMark,
  showDeleteModal,
  cardContainerName,
}) => {
  return (
    <div className={cx('card-container')}>
      <div className={cx('card-container-shape')}>
        <FontAwesomeIcon icon={faTrash} className={cx('trash')} onClick={() => showDeleteModal()} />
        <h5 className={cx('card-title')}>{cardContainerName}</h5>
        <Button className={cx('card-button')} onClick={newMark}>
          <FontAwesomeIcon icon={faStar} className={cx('star')} />
        </Button>
      </div>
      {children}
    </div>
  )
}
