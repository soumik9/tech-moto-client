import React from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading/Loading';
import UserRow from './UserRow';

const MakeAdmin = () => {

    const { data: users, isLoading, refetch } = useQuery('users', () =>
        fetch(`https://tech-moto-9.herokuapp.com/users`)
        .then(res => res.json()))

    if (isLoading) { return <Loading /> }

    return (
        <div>
            <div className='card py-3 py-md-5 mb-5'>

                <div className='text-center mb-5' style={{ borderBottom: '1px solid #686DE0' }}>
                    <h3 className='pb-3'>Manage Users</h3>
                </div>

                <Row className='justify-content-center px-3 g-0'>
                    <Col md={12} sm={12}>

                        {
                            !users.length ? <p className='text-danger text-center'>No users available</p> : <>

                                <Table responsive className='align-middle'>
                                    <thead>
                                        <tr>
                                            <th>SL</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            users.map((user, index) => <UserRow
                                                key={user._id}
                                                index={index}
                                                user={user}
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

export default MakeAdmin;