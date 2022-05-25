import React from 'react';
import { Button } from 'react-bootstrap';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import toast from 'react-hot-toast';
import auth from '../../../firebase.init';

const OrderRow = ({ index, order, refetch }) => {
 
    let navigate = useNavigate();
    const { _id, email, toolName, total, isPaid, status } = order;

    const handleIsShipped = async (orderId) => {
        const order = {status: 'shipped'};

        await axios.put(`https://tech-moto-9.herokuapp.com/update-order/${orderId}`, order, {
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
                    toast.success(`${status} updated`, { duration: 2000, position: 'top-right', });
                    refetch();
                }else{
                    toast.error('Failed!', { duration: 2000, position: 'top-right', });
                }
            }
        });
    }

    const handleOrderDelete = async (orderId) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                const deleteOrderConfirm = async () => {
                    await axios.delete(`https://tech-moto-9.herokuapp.com/order/${orderId}`)
                    .then(response => {
                        if (response.data.deletedCount) {
                            toast.success(`${toolName} deleted`, { duration: 2000, position: 'top-right', });
                            refetch();
                        } else {
                            toast.error('Delete Failed!', { duration: 2000, position: 'top-right', });
                        }
                    });
                }
                deleteOrderConfirm();
            } else {
                swal("Your imaginary file is safe!");
            }
        });
    }

    return (
        <tr>
        <td>{index + 1}</td>
        <td>{toolName}</td>
        <td>{email}</td>
        <td>{total} $</td>
        <td className='text-info'>{isPaid === 'false' ? ' Unpaid' : 'Paid'} </td>
        <td> <td>{isPaid === 'true' ? status : 'Pay first'} </td></td>
        <td>{(status === 'pending' && isPaid === 'true') ? <Button variant='success' onClick={() => handleIsShipped(_id)}>Is Shipped?</Button> : ''}</td>
        <td>{isPaid === 'false' ? <Button variant='danger' onClick={() => handleOrderDelete(_id)}>Delete</Button> : 'Already paid'}</td>

    </tr>
    );
};

export default OrderRow;