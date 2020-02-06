import React from 'react'

import Cookies from 'js-cookie'

import { renderRoutes } from 'react-router-config';
import { Redirect } from 'react-router';
// import { Redirect } from 'react-router-dom';


import { connect } from 'react-redux'
import Selectors from '../../Redux/Selectors'
const { UserSelector } = Selectors

const ProtectedRoutes = props => {
    const { user } = props
    const {
        route,
        isAuthenticated = false
    } = props

    if (!user) {
        return <Redirect to='/signin' />
    }

    return renderRoutes(route.routes)
}

export default connect(UserSelector)(ProtectedRoutes)
