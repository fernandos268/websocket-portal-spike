import React from 'react';
import { Button, Grid } from 'react-md';

export default ({ handleSanitize, todoList }) => {
   return (
      <Grid>
         <Button
            flat
            primary
            onClick={() => handleSanitize(todoList)}
            iconChildren='filter_list'
            className='multiFields__addBtn'
         >
            Sanitize
         </Button>
      </Grid>
   )
}
