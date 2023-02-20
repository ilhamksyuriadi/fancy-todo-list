import ReactQuill, { Quill } from 'react-quill'
import { func, string } from 'prop-types'
import 'react-quill/dist/quill.snow.css'
import './index.css'

const Parchment = Quill.import('parchment')
/**
 * all of Parchment related on this component in aim to make
 * class quill-custom can be recognized by ReactQuill editor
 * complete doccumentation can be see at: https://github.com/quilljs/parchment/
 * if you recognize the Parchment not installed because the parchment can also
 * be used by Quill.import('parchment'), so no need to install Parchment individually
 */
const TextEditor = ({ value, onChange }) => {
  const QuillCustomClassParchment = new Parchment.Attributor.Class(
    'quill',
    'quill',
    {
      scope: Parchment.Scope.INLINE,
      whitelist: ['custom'],
    },
  )

  Quill.register(QuillCustomClassParchment, true)

  return (
    <ReactQuill
      className="quill-custom"
      theme="snow"
      value={value}
      onChange={onChange}
      placeholder="Write what to do here..."
    />
  )
}

export default TextEditor

TextEditor.propTypes = {
  value: string.isRequired,
  onChange: func.isRequired,
}
