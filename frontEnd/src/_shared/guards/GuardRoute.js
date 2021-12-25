import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { useAuthState } from '../context/auth'

export default function GuardRoute(props) {
  const { user } = useAuthState()

  if (props.authenticated && !user) {
    return <Redirect to="/offline/login" />
  } else if (props.guest && user) {
    return <Redirect to="/online" />
  } else {
    return <Route component={props.component} {...props} />
  }
}