import Div from 'components/Div'
import Modal from 'components/Modal'

type Props = {
  isVisible: boolean
  onConfirm: () => void
  onClose: () => void
  yesLabel?: React.ReactNode
  noLabel?: React.ReactNode
  children?: React.ReactNode
}

export default function ConfirmationModal({
  isVisible,
  onConfirm,
  onClose,
  yesLabel = 'Yes',
  noLabel = 'No',
  children = <span>You sure?</span>,
}: Props) {
  return (
    <Modal show={isVisible} onClose={onClose}>
      <Div columnTop={16} itemsCenter data-testid="ConfirmationModal">
        {children}

        <button data-testid="ConfirmationModal yes button" onClick={onConfirm}>
          {yesLabel}
        </button>

        <button data-testid="ConfirmationModal no button" onClick={onClose}>
          {noLabel}
        </button>
      </Div>
    </Modal>
  )
}
