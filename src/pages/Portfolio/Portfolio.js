import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './portolio.css'

const Portfolio = () => {
    return (
        <section className='portfolio my-100'>
            <Container>

                <div className="contact__header">
                    <Row className='justify-content-center'>
                        <Col md={4}>
                            <div className='text-center'>
                                <h2 className='text-uppercase'>Soumik Ahammed</h2>
                                <p className='tech-title'>Full Stack Web Developer</p>
                                <p>Email: <span className='tech-title'>soumik.ahammed.9@gmail.com</span> </p>

                                <div>
                                    <p className='mb-0'>Varendra University (2018-2021)</p>
                                    <small>B.Sc. in CSE</small>
                                </div>
                                <div className='mt-3'>
                                    <p className='mb-0'>Skills: <span className='tech-title'>HTML, CSS, BootStrap, React, React-BootStrap, NodeJS, ExpressJS, MongoDB, PHP, Laravel, MySQL</span> </p>
                                </div>

                                <div className='mt-4'>
                                    <p>Rice WareHouse: <a href='https://rice-warehouse.web.app/' target='_blank' rel="noreferrer" className='tech-title'>Live Website</a> </p>
                                    <p>Todays Todo: <a href='https://todo-app-5e2b6.web.app/' target='_blank' rel="noreferrer"  className='tech-title'>Live Website</a> </p>
                                    <p className='mb-0'>Go Travel: <a href='https://go-travel-6e948.web.app/' target='_blank' rel="noreferrer"  className='tech-title'>Live Website</a> </p>
                                </div>

                            </div>
                        </Col>
                    </Row>
                </div>

                <div className="contact__body mt-5">
                    <Row className='justify-content-center'>
                        <Col md={6}>
                            <div className='text-center'>
                               
                            </div>
                        </Col>
                    </Row>
                </div>

            </Container>
        </section>
    );
};

export default Portfolio;