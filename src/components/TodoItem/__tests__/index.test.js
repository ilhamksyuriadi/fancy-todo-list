import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import TodoItem from '../index'

jest.mock('axios')
jest.mock('react-hot-toast', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}))

const todo = { id: 1, title: 'Todo item' }
const getTodos = jest.fn()

describe('TodoItem component', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders correctly', () => {
    const { getByText } = render(<TodoItem todo={todo} getTodos={getTodos} />)
    expect(getByText(todo.id.toString())).toBeInTheDocument()
    expect(getByText(todo.title)).toBeInTheDocument()
  })

  it('opens edit form when clicking on Edit button', () => {
    const { getByText } = render(<TodoItem todo={todo} getTodos={getTodos} />)

    fireEvent.click(getByText('Edit'))

    expect(getByText('Save')).toBeInTheDocument()
  })

  it('closes edit form when clicking on Cancel button', () => {
    const { getByText, queryByPlaceholderText } = render(
      <TodoItem todo={todo} getTodos={getTodos} />,
    )

    fireEvent.click(getByText('Edit'))
    fireEvent.click(getByText('Cancel'))

    expect(
      queryByPlaceholderText('Write what to do here...'),
    ).not.toBeInTheDocument()
  })

  it('updates todo item when clicking on Save button', async () => {
    axios.put.mockResolvedValueOnce({ data: { title: 'Updated todo item' } })

    const { getByText, getByPlaceholderText } = render(
      <TodoItem todo={todo} getTodos={getTodos} />,
    )

    fireEvent.click(getByText('Edit'))
    fireEvent.change(getByPlaceholderText('Write what to do here...'), {
      target: { value: 'Updated todo item' },
    })
    fireEvent.click(getByText('Save'))

    expect(axios.put).toHaveBeenCalledTimes(1)
    expect(axios.put).toHaveBeenCalledWith(
      expect.stringMatching(/\/tasks\/1/),
      {
        title: 'Updated todo item',
      },
    )

    await waitFor(() => expect(getTodos).toHaveBeenCalledTimes(1))
    expect(getByText('Updated todo item')).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText('Write what to do here...'),
    ).not.toBeInTheDocument()
    expect(toast.success).toHaveBeenCalledWith(expect.any(String))
  })

  it('displays an error message when failing to update todo item', async () => {
    axios.put.mockRejectedValueOnce(new Error('Network error'))

    const { getByText, getByPlaceholderText } = render(
      <TodoItem todo={todo} getTodos={getTodos} />,
    )

    fireEvent.click(getByText('Edit'))
    fireEvent.change(getByPlaceholderText('Write what to do here...'), {
      target: { value: 'Updated todo item' },
    })
    fireEvent.click(getByText('Save'))

    expect(axios.put).toHaveBeenCalledTimes(1)
    expect(axios.put).toHaveBeenCalledWith(
      expect.stringMatching(/\/tasks\/1/),
      {
        title: 'Updated todo item',
      },
    )

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith('Network error'),
    )
  })

  it('displays an error message when trying to update empty todo item', () => {
    const { getByText } = render(<TodoItem todo={todo} getTodos={getTodos} />)

    fireEvent.click(getByText('Edit'))
    fireEvent.change(getByText('Write what to do here...'), {
      target: { value: '' },
    })
  })
})
