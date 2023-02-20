import TextEditor from '../../../TextEditor'
import { string, func } from 'prop-types'

const TodoEdit = ({ value, onChange }) => {
  return <TextEditor value={value} onChange={onChange} />
}

export default TodoEdit

TodoEdit.propTypes = {
  value: string.isRequired,
  onChange: func.isRequired,
}
