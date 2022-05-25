import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { RiLoginCircleLine } from 'react-icons/ri'
import axios from 'axios';
import auth from '../../../firebase.init';
import { async } from '@firebase/util';
import toast from 'react-hot-toast';

const AddTool = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [user ] = useAuthState(auth);
    const imgStorageKey = '9536834f24e13107c187d1316c96427d';

    const handleAddTool = (data) => {
        const {email, name, quantity, minimum, price, description} = data;

        const image = data.img[0];
        const formData = new FormData();
        formData.append('image', image);

        const url =`https://api.imgbb.com/1/upload?key=${imgStorageKey}`;

        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(res =>  res.json())
        .then(result => {
            if(result.success){
                const imgUrl = result.data.url;
                const tool = {
                    email: email, name: name, img: imgUrl, quantity: quantity, minimum: minimum, price: price, description: description, sold: 0   
                }

                const addNewTool = async () => {
                    await axios.post(`https://tech-moto-9.herokuapp.com/add-tool`, tool, {
                        headers: {
                            'content-type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        }
                    })
                    .then(response => {
                        if(response.data.insertedId){
                            toast.success('New tool added!', { duration: 2000, position: 'top-right', });
                            reset();
                        }else{
                            toast.error('Faild to Add!', { duration: 2000, position: 'top-right', });
                        }
                    });
                }

                addNewTool();
            }
        })
    }

    return (
        <div className='card py-3 py-md-5 mb-5'>

            <div className='text-center mb-5' style={{ borderBottom: '1px solid #686DE0' }}>
                <h3 className='pb-3'>Add New Tool</h3>
            </div>

            <Row className='justify-content-center g-0'>
                <Col md={8} sm={12}>


                    <form onSubmit={handleSubmit(handleAddTool)} className="px-2 px-md-0">

                        <input type="hidden" value={user?.email} {...register('email')} />

                        <div className='mt-4'>
                            <Form.Label htmlFor="img" className='ps-1'>Image</Form.Label>
                            <Form.Control type="file" {...register('img', { required: true })} />
                            {errors.img && <p className='p-0 text-danger text-center'>Image is required.</p>}
                        </div>

                        <div className='mt-4'>
                            <Form.Label htmlFor="name" className='ps-1'>Tool Name</Form.Label>
                            <Form.Control type="text" {...register('name', { required: true })} placeholder='Tool name' />
                            {errors.name && <p className='p-0 text-danger text-center'>Name is required.</p>}
                        </div>

                        <div className='mt-4'>
                            <Form.Label htmlFor="price" className='ps-1'>Tool Price</Form.Label>
                            <Form.Control type="text" {...register('price', { required: true })} placeholder='Tool price' />
                            {errors.price && <p className='p-0 text-danger text-center'>Price is required.</p>}
                        </div>

                        <div className='mt-4'>
                            <Form.Label htmlFor="quantity" className='ps-1'>Quantiy</Form.Label>
                            <Form.Control type="text" {...register('quantity', { required: true })} placeholder='Tool quantity' />
                            {errors.quantity && <p className='p-0 text-danger text-center'>Quantity is require.</p>}
                        </div>

                        <div className='mt-4'>
                            <Form.Label htmlFor="minimum" className='ps-1'>Minimum Order Quantity</Form.Label>
                            <Form.Control type="text" {...register('minimum', { required: true })} placeholder='Minimum order quantity' />
                            {errors.minimum && <p className='p-0 text-danger text-center'>Minimum order quantity is required.</p>}
                        </div>

                        <div className='mt-4'>
                            <Form.Label htmlFor="description" className='ps-1'>Description</Form.Label>
                            <Form.Control type="text" as='textarea' {...register('description', { required: true })} placeholder='Tool Description' />
                            {errors.description && <p className='p-0 text-danger text-center'>Description is required.</p>}
                        </div>

                        <button className='btn tech-btn w-100 mt-5 py-2' type="submit">
                            Add Tool
                            <RiLoginCircleLine className='icon-p ms-2' />
                        </button>
                    </form>

                </Col>
            </Row>
        </div>
    );
};

export default AddTool;