import { func, bool } from 'prop-types'
import './index.css'

const TodoEditAction = ({ onClickCancel, onClickSave, loadingEdit }) => {
  return (
    <div className="todo-edit-action--container">
      <button
        className="todo-edit-action--button-cancel"
        onClick={onClickCancel}
        type="button"
      >
        Cancel
      </button>
      <button
        className="todo-edit-action--button-save"
        onClick={onClickSave}
        type="button"
        disabled={loadingEdit}
      >
        Save
      </button>
    </div>
  )
}

export default TodoEditAction

TodoEditAction.propTypes = {
  onClickCancel: func.isRequired,
  onClickSave: func.isRequired,
  loadingEdit: bool.isRequired,
}
