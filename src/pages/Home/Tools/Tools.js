import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading/Loading';
import Tool from './Tool';

const Tools = () => {

    const { data: tools, isLoading } = useQuery('tools', () => 
    fetch(`https://tech-moto-9.herokuapp.com/tools`)
    .then(res => res.json()))

    if(isLoading){return <Loading />}

    return (
        <section className='summary my-100'>
        <Container>

            <div className="summary__header">
                <Row className='justify-content-center'>
                    <Col md={6}>
                        <div className='text-center'>
                            <h2 className='text-uppercase'>Tools</h2>
                            <p className='tech-title'>Find the best motor bike tools here</p>
                        </div>
                    </Col>
                </Row>
            </div>

            <div className="summary__body mt-5">
                <Row className='gx-3 gy-5'>
                    {
                        tools.map(tool => <Tool
                            key={tool._id}
                            tool={tool}
                        ></Tool>)
                    }
                </Row>
            </div>

        </Container>
    </section>
    );
};

export default Tools;