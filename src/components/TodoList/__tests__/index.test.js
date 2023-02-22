import { render, screen } from '@testing-library/react'
import TodoList from '..'

describe('TodoList', () => {
  it('TodoList should render correctly', () => {
    render(<TodoList />)
    const todoListText = screen.getAllByText('Todo List')
    expect(todoListText).toBeDefined()
  })
})
