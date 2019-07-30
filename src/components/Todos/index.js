import React from 'react'
import { Grid, Cell, Card, Divider } from 'react-md'
import TodoList from './TodoList'
import AddButton from '../common/AddButton'
import SanitizeButton from '../common/SanitizeButton'
import ClearButton from '../common/ClearButton'
import SubmitButton from '../common/SubmitButton'
import useForm from './useForm'

export default () => {

   const {
      todoList,
      handleAdd,
      sanitizedTodos,
      handleChange,
      handleDelete,
      handleClear,
      handleSanitize,
      handleSubmit
   } = useForm()


   return (
      <Grid
         className='md-paper'
         style={{alignItems: "center", display: "flex", justifyContent:"center"}}
      >

         <Card className='md-cell md-cell-12'>
            <SubmitButton
               todoList={todoList}
               handleSubmit={handleSubmit}
            />
            <Grid>
               <SanitizeButton
                  todoList={todoList}
                  handleSanitize={handleSanitize}
                  className='md-cell md-cell-6'
               />
               <ClearButton
                  handleClear={handleClear}
                  className='md-cell md-cell-6'
               />
            </Grid>
            <Divider />
            <TodoList
               todoList={todoList}
               handleChange={handleChange}
               handleDelete={handleDelete}
            />
            <Divider />
            <AddButton
               handleAdd={handleAdd}
            />
         </Card>
      </Grid>
   )
}
