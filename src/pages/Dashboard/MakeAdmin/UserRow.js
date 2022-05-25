import React from 'react';
import { Button } from 'react-bootstrap';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import auth from '../../../firebase.init';

const UserRow = ({index, user, refetch}) => {

    let navigate = useNavigate();
    const {_id, name, email, role} = user;

    const handleAdmin = async (userId) => {

        const updatedUser = {role: "admin"};

        await axios.put(`https://tech-moto-9.herokuapp.com/user/make-admin/${email}`, updatedUser, {
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(response => {
            if(response.status === 401 || response.status === 401){
                signOut(auth);
                localStorage.removeItem('accessToken');
                navigate('/login')
                toast.error('Forbidden/Unauthorized access!', { duration: 2000, position: 'top-right', });
            }else{
                if(response.data.modifiedCount){
                    toast.success(`${name} is Admin`, { duration: 2000, position: 'top-right', });
                    refetch();
                }else{
                    toast.error('Failder!', { duration: 2000, position: 'top-right', });
                }
            }
        });
    }

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{name ? name : 'Login to update name'}</td>
            <td>{email}</td>
            <td>{role === 'user' ? <Button variant='info text-white' onClick={() => handleAdmin(_id)}>Make Admin</Button> : 'Already Admin'}</td>

        </tr>
    );
};

export default UserRow;