import useGetTodos from '../../hooks/useGetTodos'
import TodoForm from '../TodoForm'
import TodoItem from '../TodoItem'
import EmptyState from '../EmptyState'
import ErrorState from '../ErrorState'
import LoadingState from '../LoadingState'
import './index.css'

/**
 * TODO List
 * this component is the main component, used to wrap all the part of to do list
 */
export default function TodoList() {
  const { todos, loading, error, getTodos } = useGetTodos()

  if (error) {
    return <ErrorState />
  }

  return (
    <div className="todo-list--container">
      <h1 className="todo-list--title">Todo List</h1>
      <div className="todo-list--divider" />
      <TodoForm todos={todos} getTodos={getTodos} />
      <div className="todo-list--divider" />
      <div className="todo-list--item-container">
        {todos?.length > 0 ? (
          todos // TO DO: to show the last added todo first
            .slice(0)
            .reverse()
            .map((todo) => {
              return <TodoItem key={todo.id} todo={todo} getTodos={getTodos} />
            })
        ) : (
          <EmptyState />
        )}
      </div>
      {loading && <LoadingState />}
    </div>
  )
}
