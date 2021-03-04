import { createPortal } from 'react-dom'

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
  function handleBackgroundClick(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    event.target === event.currentTarget && onClose()
  }

  return createPortal(
    <Fade show={show}>
      <div className="modal-background" onClick={handleBackgroundClick}>
        <div className="modal-content" {...props}>
          {children}
        </div>
      </div>
    </Fade>,
    root!
  )
}
