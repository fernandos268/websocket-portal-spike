import React from 'react'

import { Button, Grid } from 'react-md'

export default ({ handleClear }) => {
   return (
      <Grid>
         <Button
            flat
            primary
            onClick={handleClear}
            iconChildren='clear_all'
            className='multiFields__addBtn'
         >
            Clear All
         </Button>
      </Grid>
   )
}
