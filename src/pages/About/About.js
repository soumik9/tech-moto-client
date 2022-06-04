import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const About = () => {
    return (
        <section className='my-100'>
            <Container>
                <Row className='align-items-center'>
                    <Col md={6}>
                        <img className='img-fluid' src="https://i.ibb.co/x8r2VYh/christopher-gower-vj-Mgq-Uk-S8q8-unsplash-1.jpg" alt="" />
                    </Col>
                    <Col md={6}>
                        <h3 className='tech-title text-center'>What are we for?</h3>
                        <p className='text-center'>The fundamental business philosophy of our company is gratitude and in order to give shape to this philosophy, we will continue to produce dependable products for our customers as we look forward to the next 100 years.</p>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default About;