// message for delete
export const MESSAGE_DELETE_SUCCESS = (todo) =>
  `Success delete ${todo} from Todo List`
export const MESSAGE_DELETE_ERROR_API = 'Failed delete todo, try again later'

// message for edit
export const MESSAGE_EDIT_SUCCESS = (todo) => `Success edit todo: ${todo}`
export const MESSAGE_EDIT_ERROR_API = 'Failed edit todo, try again later'
export const MESSAGE_EDIT_ERROR_EMPTY = "Todo can't be empty"
