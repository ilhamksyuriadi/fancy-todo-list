import Modal from 'react-modal'
import { bool, func, string } from 'prop-types'
import { convertTodoForMessage } from '../../../../../../utils'
import './index.css'

/**
 * this component for modal confirmation of delete todo
 */
const DeleteModal = ({ isOpen, onRequestClose, handleDelete, todoTitle }) => {
  // TO DO: need  to change the overlay color manually beacause not provided by the component api
  Modal.defaultStyles.overlay.backgroundColor = 'rgba(255,255,255,0.3)'

  const convertedTodo = convertTodoForMessage(todoTitle)

  return (
    <Modal
      className="delete-modal"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <div className="delete-modal--content">
        <p className="delete-modal--warning-ascii">&#9888;</p>
        <div className="delete-modal--text">
          <p>
            Are you sure want to delete <b>{convertedTodo}</b> from Todo List?
          </p>
        </div>
        <div className="delete-modal--button-container">
          <button
            type="button"
            className="delete-modal--button-cancel"
            onClick={onRequestClose}
          >
            No, Cancel
          </button>
          <button
            type="button"
            className="delete-modal--button-delete"
            onClick={handleDelete}
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </Modal>
  )
}

// TO DO: need to set the modal parent manually: Modal.setAppElement('body')
// to prevent warning on browser console. Can also
// done by:
// 1. aria-hidden to app content, then
// 2. ariaHideApp={false} to modal props
// but this is not recommended
Modal.setAppElement('body')

export default DeleteModal

DeleteModal.propTypes = {
  isOpen: bool,
  onRequestClose: func,
  handleDelete: func,
  todoTitle: string,
}
