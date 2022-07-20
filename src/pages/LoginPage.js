import { Box, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import axiosInstance from '../helpers/axios'
import { useNavigate } from 'react-router-dom'
import LoadingButton from '@mui/lab/LoadingButton'
import SendIcon from '@mui/icons-material/Send'

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
            />
            <LoadingButton
              size="large"
              onClick={submitHandler}
              endIcon={<SendIcon />}
              loading={isLoading}
              loadingPosition="end"
              variant="contained"
            >
              Login
            </LoadingButton>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

export default LoginPage
