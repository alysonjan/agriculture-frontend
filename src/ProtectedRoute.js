import React from 'react'
import { Navigate, Route } from 'react-router-dom'

export const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem('token') ? (
        <Component {...props} />
      ) : (
        <Navigate
          to={{
            pathname: '/',
            state: { from: props.location },
          }}
        />
      )
    }
  />
)
