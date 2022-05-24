import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import useUser from '../../../hooks/useUser';
import Loading from '../Loading/Loading';

const RequiredUser = ({children}) => {
    const [user, loading] = useAuthState(auth);
    const [userRole, userLoading] = useUser(user);

    if(loading || userLoading){ return <Loading /> }

    if(!user || !userRole) { 
        return <Navigate to="/dashboard" /> 
    }
    
    return children;
};

export default RequiredUser;