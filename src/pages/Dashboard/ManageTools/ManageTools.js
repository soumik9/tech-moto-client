import React from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import ToolRow from './ToolRow';

const ManageTools = () => {

    const { data: tools, isLoading, refetch } = useQuery('allTools', () =>
        fetch(`https://tech-moto-9.herokuapp.com/tools`)
        .then(res => res.json()))

    if (isLoading) { return <Loading /> }

    return (
        <div>
            <div className='card py-3 py-md-5 mb-5'>

                <div className='text-center mb-5' style={{ borderBottom: '1px solid #686DE0' }}>
                    <h3 className='pb-3'>Tools: {tools?.length}</h3>
                    <Link to='/dashboard/add-tool' className='btn tech-btn mb-4'>Add New Tool</Link>
                </div>

                <Row className='justify-content-center px-3 g-0'>
                    <Col md={12} sm={12}>

                        {
                            !tools.length ? <p className='text-danger text-center'>You have no tools</p> : <>

                                <Table responsive className='align-middle'>
                                    <thead>
                                        <tr>
                                            <th>SL</th>
                                            <th>Tool Name</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            tools.map((tool, index) => <ToolRow 
                                                key={tool._id}
                                                index={index}
                                                tool={tool}
                                                refetch={refetch}
                                            />)
                                        }
                                    </tbody>
                                </Table>

                            </>
                        }

                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default ManageTools;