import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import toast from 'react-hot-toast';

const OrderRow = ({ index, myOrder, refetch }) => {

    let navigate = useNavigate();
    const { _id, email, toolName, total, isPaid, status, quantity, transactionId } = myOrder;

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
            <td>
                <p>{isPaid === 'true' ? status : 'Pay first'}</p>
                {isPaid === 'true' && <p>Transaction Id: {transactionId}</p> }
            </td>
            <td>
                <Button variant='info text-white' disabled={isPaid === 'true'} onClick={() => navigate(`/dashboard/payment/${_id}`)}>Pay</Button>
            </td>
            <td>{isPaid === 'false' ? <Button variant='danger' onClick={() => handleOrderDelete(_id)}>Delete</Button> : 'Already paid'}</td>

        </tr>
    );
};

export default OrderRow;