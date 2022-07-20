import { Button } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import NewsModal from '../components/Modal'
import NewsTable from '../components/Tables/NewsTable'

const Homepage = () => {
  const [open, setOpen] = React.useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }

  return (
    <>
      <NewsModal open={open} setOpen={setOpen} />
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
          <Box sx={{ display: 'flex', justifyContent: 'end', mb: 2 }}>
            <Button size="medium" variant="contained" onClick={handleClickOpen}>
              Create
            </Button>
          </Box>
          <NewsTable />
        </Box>
      </Box>
    </>
  )
}

export default Homepage
