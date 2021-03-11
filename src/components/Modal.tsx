import { createPortal } from 'react-dom'
import styled from 'styled-components'

import Fade from 'components/Fade'

let root = document.getElementById('modal-root')

if (root === null) {
  root = document.createElement('div')
  root.id = 'modal-root'
  document.body.appendChild(root)
}

type Props = {
  show: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function Modal({ show, onClose, children, ...props }: Props) {
  function handleBackgroundClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.target === event.currentTarget && onClose()
  }

  return createPortal(
    <Fade show={show}>
      <Background onClick={handleBackgroundClick}>
        <Content {...props}>{children}</Content>
      </Background>
    </Fade>,
    root!
  )
}

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 8px;
  background: rgba(0, 0, 0, 0.7);

  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  // Poor performance on some mobile devices
  /* backdrop-filter: blur(2px); */
`

const Content = styled.div`
  display: flex;
  flex-direction: column;

  max-width: 100%;
  max-height: 100%;
  padding: 24px 16px;

  background: var(--near-white);
  border-radius: 4px;

  color: var(--near-black);

  overflow: auto;
`
