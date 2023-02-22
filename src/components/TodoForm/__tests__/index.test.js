import { fireEvent, render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import TodoForm from '..'

jest.mock('axios')

describe('TodoForm', () => {
  // const todos = [
  //   { id: 1, name: 'todo title 1' },
  //   { id: 2, name: 'todo title 2' },
  // ]
  it('TodoForm should render correctly', () => {
    render(<TodoForm />)
    const buttons = screen.getByRole('button', { type: 'button' })
    expect(buttons).toBeDefined()
  })

  it('TodoForm button add new should show form', () => {
    render(<TodoForm />)
    const buttonAddNew = screen.getByText('Add Now')
    act(() => {
      fireEvent.click(buttonAddNew)
    })
    const buttonSave = screen.getByText('Save')
    expect(buttonSave).toBeInTheDocument()
  })

  it('TodoForm click button save then get error empty', () => {
    render(<TodoForm />)
    const buttonAddNew = screen.getByText('Add Now')
    act(() => {
      fireEvent.click(buttonAddNew)
    })
    const buttonSave = screen.getByText('Save')
    act(() => {
      fireEvent.click(buttonSave)
    })
    expect(buttonSave).toBeInTheDocument() //button save still in the page
  })
})
