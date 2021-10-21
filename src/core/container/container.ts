import { container } from 'tsyringe'
import { STORAGE } from '../types/types'

container.register(STORAGE, { useValue: localStorage })
