import React from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { RiLoginCircleLine } from 'react-icons/ri'
import { useForm } from 'react-hook-form';
import './contact.css'

const Contact = () => {

    const { register, handleSubmit, formState: { errors }, } = useForm();

    const handleContact = () => {

    }

    return (
        <section className='contact py-5' id="contact">
            <Container>

                <div className="contact__header">
                    <Row className='justify-content-center'>
                        <Col md={6}>
                            <div className='text-center'>
                                <h2 className='text-uppercase text-white'>Get in touch with us</h2>
                                <p className='tech-title'>Feel free to contact us and know about us</p>
                            </div>
                        </Col>
                    </Row>
                </div>

                <div className="contact__body mt-5">
                    <Row className='justify-content-center'>
                        <Col md={6}>
                            <div className='text-center'>
                                <form onSubmit={handleSubmit(handleContact)}>

                                    <div>
                                        <Form.Label htmlFor="name" className='ps-1'>Name</Form.Label>
                                        <Form.Control type="text" {...register('name', { required: true })} placeholder='Your Name' />
                                        {errors.name && <p className='p-0 text-danger text-center'>Name is required.</p>}
                                    </div>

                                    <div>
                                        <Form.Label htmlFor="email" className='ps-1'>Email</Form.Label>
                                        <Form.Control type="email" {...register('email', { required: true })} placeholder='Your Email' />
                                        {errors.email && <p className='p-0 text-danger text-center'>Email is required.</p>}
                                    </div>

                                    <div className='mb-5'>
                                        <Form.Label htmlFor="message" className='ps-1'>Message</Form.Label>
                                        <Form.Control as="textarea" type="text" {...register('message', { required: true })} placeholder='Your Message' />
                                        {errors.message && <p className='p-0 text-danger text-center'>Message is required.</p>}
                                    </div>

                                    <button className='btn tech-btn' type="submit">
                                        Contact Us
                                        <RiLoginCircleLine className='ms-2 icon-p' />
                                    </button>
                                </form>
                            </div>
                        </Col>
                    </Row>
                </div>

            </Container>
        </section>
    );
};

export default Contact;