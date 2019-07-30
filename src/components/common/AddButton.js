import React from 'react'

import { Button, Grid } from 'react-md'

export default ({ handleAdd }) => {
   return (
      <Grid>
         <Button
            flat
            primary
            onClick={handleAdd}
            iconChildren='add_circle'
            className='multiFields__addBtn'
         >
            Add Todo
         </Button>
      </Grid>
   )
}
