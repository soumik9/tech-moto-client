import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Contact = () => {
    return (
        <section className='contact my-100'>
        <Container>

            <div className="contact__header">
                <Row className='justify-content-center'>
                    <Col md={6}>
                        <div className='text-center'>
                            <h2 className='text-uppercase'>Get in touch with us</h2>
                            <p className='tech-title'>Best bike parts provider in the world</p>
                        </div>
                    </Col>
                </Row>
            </div>

            <div className="contact__body mt-5">
                <Row>
       
                </Row>
            </div>

        </Container>
    </section>
    );
};

export default Contact;