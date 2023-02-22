import { useEffect, useCallback, useState } from 'react'
import { API_ENDPOINT } from '../config/constants'
import axios from 'axios'

const useGetTodos = () => {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const getTodos = useCallback(() => {
    setLoading(true)
    axios
      .get(`${API_ENDPOINT}/tasks`)
      .then((response) => {
        setTodos(response.data)
      })
      .catch((error) => {
        console.error(error)
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      axios
        .get(`${API_ENDPOINT}/tasks`)
        .then((response) => {
          setTodos(response.data)
        })
        .catch((error) => {
          console.error(error)
          setError(true)
        })
        .finally(() => {
          setLoading(false)
        })
    }
    fetchData()
  }, [])

  return { todos, loading, error, getTodos }
}

export default useGetTodos
