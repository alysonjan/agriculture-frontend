import { useState } from 'react'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import { TextField } from '@mui/material'
import { Box } from '@mui/system'
import axiosInstance from '../../helpers/axios'
import * as filestack from 'filestack-js'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'

export default function EventsModal({ open, setOpen }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState(new Date())
  const [url, setUrl] = useState('')

  let newDate = date.toISOString().substring(0, 10)
  var newTime = time.toLocaleTimeString()

  const handleChangeDate = (newValue) => {
    setDate(newValue)
  }
  const handleChangeTime = (newValue) => {
    setTime(newValue)
  }

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
        .post('/api/events/create', {
          title: title,
          description: description,
          location: location,
          date: newDate,
          time: newTime,
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
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle id="alert-dialog-title">{'Create Events'}</DialogTitle>
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
              label="Description"
              fullWidth
              size="small"
              multiline
              rows={3}
              sx={{ mb: 2 }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <TextField
              id="outlined-textarea"
              label="Location"
              multiline
              rows={3}
              fullWidth
              size="small"
              sx={{ mb: 2 }}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
            <DesktopDatePicker
              label="Date desktop"
              inputFormat="MM/dd/yyyy"
              value={date}
              onChange={handleChangeDate}
              renderInput={(params) => (
                <TextField size="small" fullWidth sx={{ mb: 2 }} {...params} />
              )}
            />
            <TimePicker
              label="Time"
              value={time}
              onChange={handleChangeTime}
              renderInput={(params) => (
                <TextField size="small" fullWidth sx={{ mb: 2 }} {...params} />
              )}
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
    </LocalizationProvider>
  )
}
