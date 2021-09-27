import { CardContainer } from './card-container'

export default {
  title: 'CardContainer',
  component: CardContainer
}

export const base = () => <CardContainer cardContainerName={'New'} showDeleteModal={() => {}} newMark={() => {}}>Click me</CardContainer>
