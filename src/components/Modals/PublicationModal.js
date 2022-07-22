import { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import { TextField } from '@mui/material'
import { Box } from '@mui/system'
import axiosInstance from '../../helpers/axios'
import * as filestack from 'filestack-js'

export default function PublicationModal({ open, setOpen }) {
  const [title, setTitle] = useState('')
  const [file, setFile] = useState('')
  const [url, setUrl] = useState('')

  const handleClose = () => {
    setOpen(false)
  }

  const options = {
    accept: ['image/*'],
    onFileUploadFinished: (response) => {
      setUrl(response.url)
    },
  }

  const upload = () => {
    const client = filestack.init('AbGkwK1XQAmpuTvwHktiNz')
    client.picker(options).open()
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axiosInstance
        .post('/api/publication/create', {
          title: title,
          file: file,
          image_url: url,
        })
        .then((res) => {
          if (res.status === 201) alert('Successfully added')
          handleClose()
          window.location.reload()
          return false
        })
    } catch (err) {
      alert(err.message)
    }
  }
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle id="alert-dialog-title">{'Create Article'}</DialogTitle>
          <Box sx={{ p: 2 }}>
            <TextField
              id="outlined-textarea"
              label="Title"
              fullWidth
              size="small"
              multiline
              rows={3}
              sx={{ mb: 2 }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <TextField
              id="outlined-textarea"
              label="File"
              fullWidth
              size="small"
              sx={{ mb: 2 }}
              value={file}
              onChange={(e) => setFile(e.target.value)}
              required
            />
            <Box>
              <Button
                variant="contained"
                color="primary"
                onClick={() => upload()}
              >
                Upload a file
              </Button>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', m: 3 }}>
            <Button
              sx={{ backgroundColor: '#808080' }}
              size="medium"
              variant="contained"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="medium"
              color="success"
              variant="contained"
              sx={{ ml: 3 }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Dialog>
    </div>
  )
}
