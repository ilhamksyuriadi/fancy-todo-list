import { useState } from 'react'
import TodoCTA from './components/TodoCTA'
import TodoAddForm from './components/TodoAddForm'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { API_ENDPOINT } from '../../config/constants'
import { checkExist, checkIfEmpty, convertTodoForMessage } from '../../utils'
import { func, string, shape, number, arrayOf } from 'prop-types'
import './index.css'

/**
 * this component is the common form to add todo list
 */
const TodoForm = ({ todos, getTodos }) => {
  const [showForm, setShowForm] = useState(false)
  const [addValue, setAddValue] = useState('')
  const [loadingSubmit, setLoadingSubmit] = useState(false)

  const handleChangeQuill = (value) => {
    setAddValue(value)
  }

  const handleChangeShowForm = () => {
    setShowForm((prev) => !prev)
  }

  const handleChangeLoadingSubmit = () => {
    setLoadingSubmit((prev) => !prev)
  }

  const handleSubmitTodo = async () => {
    const isExist = checkExist(todos, addValue)
    const isEmpty = checkIfEmpty(addValue)
    if (!isEmpty && !isExist) {
      handleChangeLoadingSubmit()
      const newTodo = {
        title: addValue,
      }
      axios
        .post(`${API_ENDPOINT}/tasks`, newTodo)
        .then((response) => {
          setAddValue('')
          const addedTodo = response.data.title
          const convertedAddedTodo = convertTodoForMessage(addedTodo)
          toast.success(`Success adding ${convertedAddedTodo} to Todo List`)
          setTimeout(() => getTodos(), 200)
          setTimeout(() => handleChangeShowForm(), 200)
        })
        .catch((error) => {
          const errorMessage =
            error?.message || 'Failed adding Todo List, try again later'
          toast.error(errorMessage)
        })
        .finally(() => {
          setTimeout(() => handleChangeLoadingSubmit(), 200)
        })
    } else if (!isEmpty && isExist) {
      const errorMessage = 'Todo already added'
      toast.error(errorMessage)
    } else {
      const errorMessage = "Todo can't be empty"
      toast.error(errorMessage)
    }
  }

  return (
    <div className="todo-form--container">
      {showForm ? (
        <TodoAddForm
          value={addValue}
          onChange={handleChangeQuill}
          onClickCancel={handleChangeShowForm}
          onClickSubmit={handleSubmitTodo}
          loadingSubmit={loadingSubmit}
        />
      ) : (
        <TodoCTA onClickCTA={handleChangeShowForm} />
      )}
    </div>
  )
}

export default TodoForm

TodoForm.propTypes = {
  todos: arrayOf(shape({ id: number, title: string })),
  getTodos: func,
}
