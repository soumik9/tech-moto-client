import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { AiOutlineHome } from 'react-icons/ai'
import notFoundImg from '../../../assets/404.png'

const NotFound = () => {
    return (
        <section className='pb-5 my-100'>
            <Container>
                <div className="not__found__container">
                    <Row className='justify-content-center'>
                        <Col md={5}>
                            <img className='img-fluid' src={notFoundImg} alt="" />
                            <div className="text-center mt-4">
                                <Link to='/' className='btn tech-btn '>GO HOME <AiOutlineHome className='icon-p ms-2' /></Link>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </section>
    );
};

export default NotFound;