import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './news.css'

const GetNews = () => {
    return (
        <section className='newsletter my-100'>
            <Container>

                <div className="review__header">
                    <Row className='justify-content-center'>
                        <Col md={6}>
                            <div className='text-center'>
                                <h2 className='text-uppercase text-white'>Newsletter</h2>
                                <p className=''>SUBSCRIBE TO OUR NEWSLETTER</p>
                            </div>
                        </Col>
                    </Row>
                </div>

                <div className="review__body mt-5">
                    <Row>
                        <Col md={12}>
                            <div class="input-group">
                                <input type="email" class="form-control" placeholder="Enter your email" />
                                <span class="input-group-btn">
                                <button class="btn" type="submit">Subscribe Now</button>
                                </span>
                            </div>
                        </Col>
                    </Row>
                </div>

            </Container>
        </section>
    );
};

export default GetNews;