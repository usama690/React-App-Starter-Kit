import { Modal, ModalProps } from 'antd'

const AppModal = ({ children, style, open, onCancel, ...rest }: ModalProps): ReactNode => {
  return (
    <Modal open={open} onCancel={onCancel} style={style} {...rest}>
      {children}
    </Modal>
  )
}

export default AppModal
