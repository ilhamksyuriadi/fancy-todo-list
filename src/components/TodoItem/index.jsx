import { useState } from 'react'
import axios from 'axios'
import TodoItemTitle from './components/TodoItemTitle'
import TodoItemContent from './components/TodoItemContent'
import TodoItemAction from './components/TodoItemAction'
import TodoEdit from './components/TodoEdit'
import TodoEditAction from './components/TodoEditAction'
import { toast } from 'react-hot-toast'
import { API_ENDPOINT } from '../../config/constants'
import { checkIfEmpty, convertTodoForMessage } from '../../utils'
import { string, shape, number, func } from 'prop-types'
import {
  MESSAGE_DELETE_SUCCESS,
  MESSAGE_DELETE_ERROR_API,
  MESSAGE_EDIT_SUCCESS,
  MESSAGE_EDIT_ERROR_API,
  MESSAGE_EDIT_ERROR_EMPTY,
} from './constants'
import './index.css'

/**
 * this component the "card component" of to do list also contain modal for confirmation
 */
const TodoItem = ({ todo, getTodos }) => {
  const [showEditForm, setShowEditForm] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [editValue, setEditValue] = useState(todo.title)
  const [loadingDelete, setLoadingDelete] = useState(false)
  const [loadingEdit, setLoadingEdit] = useState(false)

  const handleChangeDeleteModal = () => {
    setShowDeleteModal((prev) => !prev)
  }

  const handleChangeEditForm = () => {
    setShowEditForm((prev) => !prev)
  }

  const handleChangeEditValue = (value) => {
    setEditValue(value)
  }

  const handleChangeLoadingDelete = () => {
    setLoadingDelete((prev) => !prev)
  }

  const handleChangeLoadingEdit = () => {
    setLoadingEdit((prev) => !prev)
  }

  const handleDelete = async () => {
    handleChangeLoadingDelete()
    handleChangeDeleteModal() // TO DO: to close modal immidiately after click deleta at modal confirmation
    axios
      .delete(`${API_ENDPOINT}/tasks/${todo.id}`)
      .then((response) => {
        const deletedTodo = convertTodoForMessage(response.data.title) || '' //TO DO: sometimes the server doesn't sent the title back, need to remove it
        toast.success(MESSAGE_DELETE_SUCCESS(deletedTodo))
        setTimeout(() => getTodos(), 200)
      })
      .catch((error) => {
        const errorMessage = error?.message || MESSAGE_DELETE_ERROR_API
        toast.error(errorMessage)
      })
      .finally(() => {
        setTimeout(() => handleChangeLoadingDelete(), 200)
      })
  }

  const handleEdit = async () => {
    const isEmpty = checkIfEmpty(editValue)
    if (!isEmpty) {
      handleChangeLoadingEdit()
      const editedTodo = {
        title: editValue,
      }
      axios
        .put(`${API_ENDPOINT}/tasks/${todo.id}`, editedTodo)
        .then((response) => {
          const editedTodo = convertTodoForMessage(response.data.title) || '' //TO DO: sometimes the server doesn't sent the title back, need to remove it
          toast.success(MESSAGE_EDIT_SUCCESS(editedTodo))
          setTimeout(() => getTodos(), 200)
          setTimeout(() => handleChangeEditForm(), 200)
        })
        .catch((error) => {
          const errorMessage = error?.message || MESSAGE_EDIT_ERROR_API
          toast.error(errorMessage)
        })
        .finally(() => {
          setTimeout(() => handleChangeLoadingEdit(), 200)
        })
    } else {
      const errorMessage = MESSAGE_EDIT_ERROR_EMPTY
      toast.error(errorMessage)
    }
  }

  return (
    <div
      className={`todo-item--container 
      ${showEditForm && 'todo-item--container-edit-active'}`}
    >
      <TodoItemTitle title={todo.id.toString()} />
      {showEditForm ? (
        <TodoEdit value={editValue} onChange={handleChangeEditValue} />
      ) : (
        <TodoItemContent content={todo.title} />
      )}
      {showEditForm ? (
        <TodoEditAction
          onClickCancel={handleChangeEditForm}
          onClickSave={handleEdit}
          loadingEdit={loadingEdit}
        />
      ) : (
        <TodoItemAction
          todoTitle={todo.title}
          onClickShoweModal={handleChangeDeleteModal}
          onClickDelete={handleDelete}
          onClickEdit={handleChangeEditForm}
          showDeleteModal={showDeleteModal}
          loadingDelete={loadingDelete}
        />
      )}
    </div>
  )
}

export default TodoItem

TodoItem.propTypes = {
  todo: shape({ id: number.isRequired, title: string.isRequired }).isRequired,
  getTodos: func.isRequired,
}
