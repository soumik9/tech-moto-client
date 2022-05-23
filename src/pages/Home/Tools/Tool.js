import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './tool.css'

const Tool = ({ tool }) => {

    const { _id, name, img, price, minimum, quantity, description } = tool;
    let navigate = useNavigate();

    return (
        <Col md={4}>
            <Card >
                <Card.Img className='too-img' variant="top" src={img} />
                <Card.Body className='mt-3 text-center'>
                    <h4 className='text-center'>{ name }</h4>
                    <div className='py-3'>
                        <div><small>Minimum Order Quantity: <span className='tech-title'>{ minimum } pc</span></small></div>
                        <div><small>Available Quantity: <span className='tech-title'>{ quantity } pc</span></small></div>
                    </div>
                    <div><p>Price (Per Unit): <span className='tech-title'>{ price } $</span></p></div>
                    <p>{ description }</p>
                    <Button className='tech-btn' onClick={() => navigate(`/tool/${_id}`)}>Purchase</Button>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default Tool;