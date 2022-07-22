import {
  Box,
  Paper,
  TextField,
  Typography,
  Backdrop,
  Button,
} from '@mui/material'
import React, { useState } from 'react'
import axiosInstance from '../helpers/axios'
import { useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'

const LoginPage = () => {
  let navigate = useNavigate()

  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await axiosInstance
        .post('/api/user/signin', {
          phone_number: phoneNumber,
          password: password,
        })
        .then((res) => {
          if (res.status === 200) {
            setIsLoading(false)
            navigate('/home', { state: res?.data, replace: true })
          }
        })
    } catch (err) {
      alert(err.response.data.msg)
      setIsLoading(false)
    }
  }

  return (
    <>
      {isLoading ? (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : null}

      <Box
        sx={{
          height: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: '50%',
            margin: 'auto',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="h4" color="primary">
              Welcome to Admin Portal
            </Typography>
          </Box>
          <form onSubmit={submitHandler}>
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
              <Box
                sx={{
                  width: { sm: 200, md: 400, lg: 700 },
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <TextField
                  id="phonenumber"
                  label="Phone number"
                  variant="outlined"
                  size="medium"
                  sx={{ mb: 2 }}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
                <TextField
                  id="password"
                  label="Password"
                  variant="outlined"
                  size="medium"
                  type="Password"
                  sx={{ mb: 2 }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button size="large" type="submit" variant="contained">
                  Login
                </Button>
              </Box>
            </Box>
          </form>
        </Paper>
      </Box>
    </>
  )
}

export default LoginPage
