import { string } from 'prop-types'
import './index.css'

const TodoItemTitle = ({ title }) => {
  return (
    <div className="todo-item-title--container">
      <span>
        <p>
          <b>TODO ID</b>: {title}
        </p>
      </span>
      <div className="todo-item-title--divider" />
    </div>
  )
}

export default TodoItemTitle

TodoItemTitle.propTypes = {
  title: string.isRequired,
}
