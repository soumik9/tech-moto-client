import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import aboutImg from '../../../assets/about.jpg'

const About = () => {

    const navigate = useNavigate();

    return (
        <section className='about my-100'>
            <Container>

                <div className="about__header">
                    <Row className='justify-content-center'>
                        <Col md={6}>
                            <div className='text-center'>
                                <h2 className='text-uppercase'>About us</h2>
                                <p className='tech-title'>What TECH MOTO Brings to the Future</p>
                            </div>
                        </Col>
                    </Row>
                </div>

                <div className="about__body mt-5">
                    <Row className='align-items-center'>
                        <Col md={6} className='mb-5 mb-md-0'>
                            <div className='pe-0 pe-md-5 text-center'>
                                <h2 className='mb-4'>The TECH MOTO Network throughout the World</h2>
                                <p>The fundamental business philosophy of our company is gratitude and in order to give shape to this philosophy, we will continue to produce dependable products for our customers as we look forward to the next 100 years.</p>
                                <div className='mt-4'>
                                    <button className='btn tech-btn' onClick={() => navigate('/about')}>Know More</button>
                                </div>
                            </div>
                        </Col>
                        <Col md={6}>
                            <img className='img-fluid' src={aboutImg} alt="contactImage" />
                        </Col>
                    </Row>
                </div>

            </Container>
        </section>
    );
};

export default About;