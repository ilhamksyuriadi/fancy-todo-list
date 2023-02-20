import TextEditor from '../../../TextEditor'
import { string, func, bool } from 'prop-types'
import './index.css'

const TodoAddForm = ({
  value,
  onChange,
  onClickCancel,
  onClickSubmit,
  loadingSubmit,
}) => {
  return (
    <div>
      <TextEditor value={value} onChange={onChange} />
      <div className="todo-add-form--button-container">
        <button
          onClick={onClickCancel}
          className="todo-add-form--button-cancel"
          type="button"
        >
          Cancel
        </button>
        <button
          onClick={onClickSubmit}
          className="todo-add-form--button-save"
          type="button"
          disabled={loadingSubmit}
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default TodoAddForm

TodoAddForm.propTypes = {
  value: string.isRequired,
  onChange: func.isRequired,
  onClickCancel: func.isRequired,
  onClickSubmit: func.isRequired,
  loadingSubmit: bool.isRequired,
}
