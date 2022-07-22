import { Button } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import PublicationModal from '../components/Modals/PublicationModal'
import PublicationTable from '../components/Tables/PublicationTable'

const PublicationPage = () => {
  const [open, setOpen] = React.useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }

  return (
    <>
      <PublicationModal open={open} setOpen={setOpen} />
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
              Publish
            </Button>
          </Box>
          <PublicationTable />
        </Box>
      </Box>
    </>
  )
}

export default PublicationPage
