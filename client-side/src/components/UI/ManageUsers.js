import React, { useState, useEffect } from 'react';

import { Container, Row, Col, ListGroup, Button, ButtonGroup } from 'react-bootstrap';
import axios from '../../helpers/axios';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('/admin/users')
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const changeRole = (id, role) => {
        axios.put(`/admin/users/${id}/role`, { role })
            .then(response => {
                setUsers(users.map(user => user._id === id ? response.data : user));
            })
            .catch(error => console.error('Error changing role:', error));
    };

    const deleteUser = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            axios.delete(`/admin/users/${id}`)
                .then(() => {
                    setUsers(users.filter(user => user._id !== id));
                })
                .catch(error => console.error('Error deleting user:', error));
        }
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h2 className="my-4">Manage Users</h2>
                    <ListGroup>
                        {users.map(user => (
                            <ListGroup.Item key={user._id}>
                                <Row>
                                    <Col xs={4}>Name: <span className='fw-light'>{user.firstName} {user.lastName}</span> | Role: <span className='fw-light'>{user.role}</span></Col>
                                    <Col xs={2}></Col>
                                    <Col xs={6} className='d-flex justify-content-between'>
                                        <Button disabled={user.role === 'dealer'} variant="info" className="mr-2" onClick={() => changeRole(user._id, 'dealer')}>Make Dealer</Button>
                                        <Button disabled={user.role === 'client'} variant="info" className="mr-2" onClick={() => changeRole(user._id, 'client')}>Make Client</Button>
                                        <Button variant="danger" onClick={() => deleteUser(user._id)}>Delete</Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default ManageUsers;
