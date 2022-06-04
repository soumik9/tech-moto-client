import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { useQuery } from 'react-query';
import Tool from '../Home/Tools/Tool';
import Loading from '../Shared/Loading/Loading';

const Tools = () => {

    const { data: tools, isLoading } = useQuery('tools', () => 
    fetch(`https://tech-moto-9.herokuapp.com/tools`)
    .then(res => res.json()))

    if(isLoading){return <Loading />}

    return (
        <section className='my-100'>
            <Container>
                <Row>
                <div className="summary__body mt-5">
                <Row className='gx-3 gy-5'>
                    {
                        tools.slice(0, 6).map(tool => <Tool
                            key={tool._id}
                            tool={tool}
                        ></Tool>)
                    }
                </Row>
            </div>
                </Row>
            </Container>
        </section>
    );
};

export default Tools;