import { func, string, bool } from 'prop-types'
import DeleteModal from './components/DeleteModal'
import './index.css'

const TodoItemAction = ({
  todoTitle,
  onClickShoweModal,
  onClickDelete,
  onClickEdit,
  showDeleteModal,
  loadingDelete,
}) => {
  return (
    <>
      <div className="todo-item-action--container">
        <button
          className="todo-item-action--button-edit"
          onClick={onClickEdit}
          type="button"
        >
          Edit
        </button>
        <button
          className="todo-item-action--button-delete"
          onClick={onClickShoweModal}
          type="button"
          disabled={loadingDelete}
        >
          Delete
        </button>
      </div>
      <DeleteModal
        isOpen={showDeleteModal}
        onRequestClose={onClickShoweModal}
        handleDelete={onClickDelete}
        todoTitle={todoTitle}
      />
    </>
  )
}

export default TodoItemAction

TodoItemAction.propTypes = {
  todoTitle: string.isRequired,
  onClickShoweModal: func.isRequired,
  onClickDelete: func.isRequired,
  onClickEdit: func.isRequired,
  showDeleteModal: bool.isRequired,
  loadingDelete: bool.isRequired,
}
