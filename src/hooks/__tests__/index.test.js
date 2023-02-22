import { renderHook } from '@testing-library/react-hooks'
import useGetTodos from '../useGetTodos'
import { API_ENDPOINT } from '../../config/constants'
import axios from 'axios'

jest.mock('axios')

describe('useGetTodos', () => {
  it('useGetTodos fetch data success', async () => {
    const todos = [
      { id: 1, name: 'todo title 1' },
      { id: 2, name: 'todo title 2' },
    ]
    axios.get.mockResolvedValueOnce(todos)

    const { result, waitForNextUpdate } = renderHook(() => useGetTodos())
    expect(result.current.loading).toBeTruthy()

    await waitForNextUpdate()

    expect(axios.get).toHaveBeenCalledWith(`${API_ENDPOINT}/tasks`)
    expect(result.current.error).toBeFalsy()
    expect(result.current.loading).toBeFalsy()
  })

  it('useGetTodos fetch data error', async () => {
    jest.spyOn(axios, 'get').mockRejectedValue(new Error('error'))
    const { result, waitForNextUpdate } = renderHook(() => useGetTodos())
    expect(result.current.loading).toBeTruthy()

    await waitForNextUpdate()

    expect(axios.get).toHaveBeenCalledWith(`${API_ENDPOINT}/tasks`)
    expect(result.current.error).toBeTruthy()
    expect(result.current.loading).toBeFalsy()
  })

  it.skip('useGetTodos call getTodos', async () => {
    jest.spyOn(axios, 'get')
    renderHook(() => useGetTodos())
    expect(axios.get).toHaveBeenCalledWith(`${API_ENDPOINT}/tasks`)
  })
})
