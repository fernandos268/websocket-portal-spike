import { useState } from 'react';

import { InitialFields, InitialList } from './InitialState'

import uuid from 'uuidv4';

export default () => {
   const [todoList, setTodoList] = useState(InitialList)
   const [sanitizedTodos, setSanitizedTodos] = useState([])

   const handleChange = (value, key, list, todoItem) => {
      const newList = list.map(item => {
         if(item.todo_id === todoItem.todo_id){
            return {
               ...item,
               todo_id: todoItem.todo_id,
               [key]: value
            }
         }
         return item
      })
      setTodoList(newList)
   }

   const handleDelete = (id, list )  => {
      console.log({handleDelete:{ id, list }});
      const newList = list.filter(e => e.todo_id !== id)
      setTodoList(newList)
   }

   const handleAdd = () => {
      setTodoList(todoList => [...todoList, {...InitialFields, todo_id: uuid()}])
   }

   const handleSanitize = (list) => {
      setTodoList(sanitize(list))
   }

   const handleClear = () => {
      setTodoList([])
   }

   const sanitize = (list) => list.filter(todo => todo.title !== '')

   const handleSubmit = (list) => {
      setSanitizedTodos(sanitize(list))
   }

   return {
      todoList,
      sanitizedTodos,
      handleAdd,
      handleChange,
      handleDelete,
      handleClear,
      handleSanitize,
      handleSubmit
   }
}
