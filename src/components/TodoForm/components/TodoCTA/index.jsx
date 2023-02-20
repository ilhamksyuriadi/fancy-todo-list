import { func } from 'prop-types'
import './index.css'

const TodoCTA = ({ onClickCTA }) => {
  return (
    <div className="todo-cta--container">
      <p>
        Add new <b>Todo List</b> by click button below
      </p>
      <button
        type="button"
        className="todo-cta--button-add"
        onClick={onClickCTA}
      >
        Add Now
      </button>
    </div>
  )
}

export default TodoCTA

TodoCTA.propTypes = {
  onClickCTA: func.isRequired,
}
