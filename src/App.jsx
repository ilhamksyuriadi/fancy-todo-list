import TodoList from './components/TodoList'
import { Toaster } from 'react-hot-toast'
import './App.css'

export default function App() {
  return (
    <div className="App">
      <TodoList />
      <Toaster />
    </div>
  )
}
