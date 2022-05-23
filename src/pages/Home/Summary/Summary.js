import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { FaUsers, FaMapMarkedAlt, FaTools } from 'react-icons/fa'
import { MdOutlineRateReview } from 'react-icons/md'
import './summary.css'

const Summary = () => {

    const summaries = [
        {icon: <FaUsers className='summary__item-icon mb-3' />, count: 500, text: 'Happy Customers'},
        {icon: <FaMapMarkedAlt className='summary__item-icon mb-3' />, count: 65, text: 'Countries'},
        {icon: <FaTools className='summary__item-icon mb-3' />, count: 1500, text: 'Tools'},
        {icon: <MdOutlineRateReview className='summary__item-icon mb-3' />, count: 800, text: 'Reviews'},
    ]

    return (
        <section className='summary my-100'>
            <Container>

                <div className="summary__header">
                    <Row className='justify-content-center'>
                        <Col md={6}>
                            <div className='text-center'>
                                <h2 className='text-uppercase'>Trusted Bussiness to worldwide</h2>
                                <p className='tech-title'>Best bike parts provider in the world</p>
                            </div>
                        </Col>
                    </Row>
                </div>

                <div className="summary__body mt-5">
                    <Row>
                        {
                            summaries.map(summary => (
                                <Col md={3}>
                                <div className="summary__item mb-5 mb-md-0">
                                    <Card>
                                        <Card.Body className='text-center'>
                                            {summary.icon} 
                                            <h2>{summary.count}</h2>
                                            <p>{summary.text}</p>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Col>
                            ))
                        }
                    </Row>
                </div>

            </Container>
        </section>
    );
};

export default Summary;