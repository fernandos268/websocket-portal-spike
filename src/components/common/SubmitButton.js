import React from 'react';
import { Button, Grid } from 'react-md';

export default ({ handleSubmit, todoList }) => {
   return (
      <Grid>
         <Button
            raised
            primary
            onClick={() => handleSubmit(todoList)}
            iconChildren='send'
            className='multiFields__addBtn'
         >
            Submit
         </Button>
      </Grid>
   )
}
