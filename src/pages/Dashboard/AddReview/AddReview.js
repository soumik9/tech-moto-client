import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { RiLoginCircleLine } from 'react-icons/ri'
import toast from 'react-hot-toast';
import axios from 'axios';
import auth from '../../../firebase.init';

const AddReview = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [user ] = useAuthState(auth);

    const handleAddReview = async (data) => {
        await axios.post(`https://tech-moto-9.herokuapp.com/add-review`, data)
        .then(response => {
            if(response.data.insertedId){
                toast.success('Review Added!', { duration: 2000, position: 'top-right', });
                reset();
            }else{
                toast.error('Faild to Add!', { duration: 2000, position: 'top-right', });
            }
        });
    }

    return (
        <div className='card py-3 py-md-5 mb-5'>

            <div className='text-center mb-5' style={{ borderBottom: '1px solid #686DE0' }}>
                <h3 className='pb-3'>Add a Review</h3>
            </div>

            <Row className='justify-content-center g-0'>
                <Col md={8} sm={12}>


                    <form onSubmit={handleSubmit(handleAddReview)} className="px-2 px-md-0">

                        <input type="hidden" value={user?.email} {...register('email')} />
                        <input type="hidden" value={user?.displayName} {...register('name')} />

                        <div className='mt-4'>
                            <Form.Label htmlFor="img" className='ps-1'>Image Link</Form.Label>
                            <Form.Control type="text" {...register('img', { required: true })} placeholder='Your image' />
                            {errors.img && <p className='p-0 text-danger text-center'>Image is required.</p>}
                        </div>

                        <div className='mt-4'>
                            <Form.Label htmlFor="rank" className='ps-1'>Position</Form.Label>
                            <Form.Control type="text" {...register('rank', { required: true })} placeholder='Your rank (ex: Programmer)' />
                            {errors.rank && <p className='p-0 text-danger text-center'>Rank is required.</p>}
                        </div>

                        <div className='mt-4'>
                            <Form.Label htmlFor="rating" className='ps-1'>Rating</Form.Label>
                            <Form.Select {...register('rating')}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Form.Select>
                        </div>

                        <div className='mt-4'>
                            <Form.Label htmlFor="description" className='ps-1'>Description</Form.Label>
                            <Form.Control type="text" as="textarea" {...register('description', { required: true })} placeholder='Your Description' />
                            {errors.description && <p className='p-0 text-danger text-center'>Description is required.</p>}
                        </div>

                        <button className='btn tech-btn w-100 mt-5 py-2' type="submit">
                            Add Review
                            <RiLoginCircleLine className='icon-p ms-2' />
                        </button>
                    </form>

                </Col>
            </Row>
        </div>
    );
};

export default AddReview;