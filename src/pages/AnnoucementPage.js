import { Box } from '@mui/system'
import React from 'react'
import AnnouncementTable from '../components/Tables/AnnouncementTable'

const AnnouncementPage = () => {
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
          <AnnouncementTable />
        </Box>
      </Box>
    </>
  )
}

export default AnnouncementPage
