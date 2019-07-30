import React from 'react'
import {
   Cell,
   Grid,
   Button,
   Checkbox,
   TextField
} from 'react-md'

export default ({todoList, handleChange, handleDelete}) =>
   todoList.map(todoItem => {
      const { todo_id, is_complete, title} = todoItem
      return (
         <Grid>
            <Cell align='bottom' size={2} >
               <Checkbox
                  id={`cb_${todo_id}`}
                  name={`cb_${todo_id}`}
                  label=''
                  checked={is_complete}
                  onChange={e => handleChange(e, 'is_complete', todoList, todoItem )}
                  />
            </Cell>
            <Cell align='bottom' size={8}>
               <TextField
                  id="title"
                  value={title}
                  placeholder="Title"
                  onChange={e => handleChange(e, 'title' , todoList, todoItem)}
               />
            </Cell>
            <Cell align='bottom' size={2}>
               <Button
                  icon
                  id="btn_remove"
                  key="btn_remove"
                  onClick={() => handleDelete(todo_id, todoList)}
                  iconChildren="delete"
               />
            </Cell>
         </Grid>
      )
   })
