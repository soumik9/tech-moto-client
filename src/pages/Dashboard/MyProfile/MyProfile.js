import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { RiLoginCircleLine } from 'react-icons/ri'
import axios from 'axios';
import auth from '../../../firebase.init';
import toast from 'react-hot-toast';
import Loading from '../../Shared/Loading/Loading';
import { useQuery } from 'react-query';

const MyProfile = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [user ] = useAuthState(auth);

    const { data: info, isLoading, refetch } = useQuery('singleUser', () =>
    fetch(`https://tech-moto-9.herokuapp.com/user/${user?.email}`)
    .then(res => res.json()))

    // if data is loading
    if (isLoading) { return <Loading /> }

    const handleUpdateUser = async (data) => {

        const {name, email, education, location, mobile, linkedin} = data;
        const updatedUser = {education: education, location: location, mobile: mobile, linkedin: linkedin};

        await axios.put(`https://tech-moto-9.herokuapp.com/update-user/${email}`, updatedUser)
        .then(response => {
            if(response.data.modifiedCount){
                toast.success(`${name} profile updated`, { duration: 2000, position: 'top-right', });
                refetch();
                reset() 
            }else{
                toast.error('Profile Update Failed!', { duration: 2000, position: 'top-right', });
            }
        });
    }

    return (
        <div className='card py-3 py-md-5 mb-5'>

            <div className='text-center mb-5' style={{ borderBottom: '1px solid #686DE0' }}>
                <h3 className='pb-3'>Update Profile</h3>
                <div className='d-flex justify-content-center'>
                    <div><p className='me-3'>Name: <span className='tech-title'>{user?.displayName}</span></p></div>
                    <div><p>Email: <span className='tech-title'>{user?.email}</span></p></div>
                </div>
                {
                    info ? ( <>
                        <div className='d-flex justify-content-center'>
                            <div><p className='me-3'>Educaton: <span className='tech-title'>{info?.education}</span></p></div>
                            <div><p>Location: <span className='tech-title'>{info?.location}</span></p></div>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <div><p className='me-3'>Mobile: <span className='tech-title'>{info?.mobile}</span></p></div>
                            <div><p>Linkedin: <span className='tech-title'>{info?.linkedin}</span></p></div>
                        </div>
                    </>) : <p>Plase update profile</p>
                }
            </div>

            <Row className='justify-content-center g-0'>
                <Col md={8} sm={12}>


                    <form onSubmit={handleSubmit(handleUpdateUser)} className="px-2 px-md-0">

                        <input type="hidden" value={user?.email} {...register('email')} />
                        <input type="hidden" value={user?.displayName} {...register('name')} />

                        <div className='mt-4'>
                            <Form.Label htmlFor="education" className='ps-1'>Education</Form.Label>
                            <Form.Control type="text" {...register('education', { required: true })} placeholder='Your education' />
                            {errors.education && <p className='p-0 text-danger text-center'>Education is required.</p>}
                        </div>

                        <div className='mt-4'>
                            <Form.Label htmlFor="location" className='ps-1'>Location</Form.Label>
                            <Form.Control type="text" {...register('location', { required: true })} placeholder='Your Location (ex: Dhaka)' />
                            {errors.location && <p className='p-0 text-danger text-center'>Location is required.</p>}
                        </div>

                        <div className='mt-4'>
                            <Form.Label htmlFor="mobile" className='ps-1'>Mobile Number</Form.Label>
                            <Form.Control type="text" {...register('mobile', { required: true })} placeholder='Your mobile number' />
                            {errors.mobile && <p className='p-0 text-danger text-center'>Mobile Number is require.</p>}
                        </div>

                        <div className='mt-4'>
                            <Form.Label htmlFor="linkedin" className='ps-1'>Linkedin</Form.Label>
                            <Form.Control type="text" {...register('linkedin', { required: true })} placeholder='Your Linkedin' />
                            {errors.linkedin && <p className='p-0 text-danger text-center'>Linkedin is required.</p>}
                        </div>

                        <button className='btn tech-btn w-100 mt-5 py-2' type="submit">
                            Update Profile
                            <RiLoginCircleLine className='icon-p ms-2' />
                        </button>
                    </form>

                </Col>
            </Row>
        </div>
    );
};

export default MyProfile;