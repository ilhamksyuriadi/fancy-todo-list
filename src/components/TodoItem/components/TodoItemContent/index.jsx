import { string } from 'prop-types'
import './index.css'

const TodoItemContent = ({ content }) => {
  return (
    <div className="todo-item-content--container">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}

export default TodoItemContent

TodoItemContent.propTypes = {
  content: string.isRequired,
}
