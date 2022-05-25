import React from 'react';
import { Button } from 'react-bootstrap';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import toast from 'react-hot-toast';
import auth from '../../../firebase.init';

const ToolRow = ({ tool, index, refetch }) => {

    let navigate = useNavigate();
    const {_id, name, price, quantity} = tool;

    const  handleToolDelete = (toolId) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                const deleteToolConfirm = async () => {
                    await axios.delete(`https://tech-moto-9.herokuapp.com/tool/${toolId}`,{
                        headers: {
                            'content-type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        }
                    })
                    .then(response => {
                        if(response.status === 401 || response.status === 401){
                            signOut(auth);
                            navigate('/login')
                            toast.error('Forbidden/Unauthorized access!', { duration: 2000, position: 'top-right', });
                        }else{
                            if (response.data.deletedCount) {
                                toast.success(`${name} deleted`, { duration: 2000, position: 'top-right', });
                                refetch();
                            } else {
                                toast.error('Delete Failed!', { duration: 2000, position: 'top-right', });
                            }
                        }
                    });
                }
                deleteToolConfirm();
            } else {
                swal("Your imaginary file is safe!");
            }
        });
    }

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{name}</td>
            <td>{quantity}</td>
            <td>{price} $</td>
            <td><Button variant='danger' onClick={() => handleToolDelete(_id)}>Delete</Button></td>
        </tr>
    );
};

export default ToolRow;