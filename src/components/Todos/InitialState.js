import uuid from 'uuidv4'

export const InitialFields = {
   todo_id: uuid(),
   title: '',
   is_complete: false,
}

export const InitialList = [{...InitialFields}]
