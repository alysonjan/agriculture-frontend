import { Button } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import MessagesTable from '../components/Tables/MessagesTable'

const MessagesPage = () => {
  const [open, setOpen] = React.useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }

  return (
    <>
      <Box
        sx={{
          height: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: '80%',
            margin: 'auto',
          }}
        >
          {/* <Box sx={{ display: 'flex', justifyContent: 'end', mb: 2 }}>
            <Button size="medium" variant="contained" onClick={handleClickOpen}>
              Create
            </Button>
          </Box> */}
          <MessagesTable />
        </Box>
      </Box>
    </>
  )
}

export default MessagesPage
