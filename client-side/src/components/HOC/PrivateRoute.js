import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = (props) => {
    const { component: Component, ...rest } = props;
    return <Route {...rest} component={(props_s) => {
        const token = window.localStorage.getItem('token');
        const user = window.localStorage.getItem('user');
        if(user.role === 'admin'){
            return <Component {...props_s} />
        }else if (token) {
            return <Component {...props_s} />
        } else {
            return <Redirect to={'/signin'} />
        }
    }} />
}

export default PrivateRoute