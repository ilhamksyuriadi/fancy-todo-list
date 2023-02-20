import { REGEX_CHECK_HTML_TAG } from '../config/constants'

export const removeTagHtml = (value) => {
  return value.replace(REGEX_CHECK_HTML_TAG, '')
}

export const checkExist = (todos, newTodoTitle) => {
  const duplicateTodos = todos?.filter(
    (todo) =>
      removeTagHtml(todo.title).toLowerCase() ===
      removeTagHtml(newTodoTitle).toLowerCase(),
  )
  if (duplicateTodos?.length) {
    return true
  }
  return false
}

export const checkIfEmpty = (value) => {
  if (removeTagHtml(value).trim().length === 0) {
    return true
  }
  return false
}

export const convertTodoForMessage = (todo) => {
  const convertedTodo = todo?.length
    ? removeTagHtml(todo).trim().slice(0, 10)
    : ''
  return convertedTodo.length > 6 ? convertedTodo + '...' : convertedTodo
}
