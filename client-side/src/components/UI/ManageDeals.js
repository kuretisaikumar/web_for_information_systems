import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, Button, Modal, Form } from 'react-bootstrap';
import axios from '../../helpers/axios';
import dayjs from 'dayjs';

const ManageBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentBooking, setCurrentBooking] = useState({});

    useEffect(() => {
        axios.get('/admin/deals')
            .then(response => setBookings(response.data))
            .catch(error => console.error('Error fetching bookings:', error));
    }, []);

    const handleShowModal = (booking) => {
        setCurrentBooking(booking || {});
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    const handleChange = (e) => {
        setCurrentBooking({ ...currentBooking, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        axios.put(`/admin/deals/${currentBooking._id}`, currentBooking)
            .then(response => {
                setBookings(bookings.map(booking => booking._id === currentBooking._id ? response.data : booking));
                handleCloseModal();
            })
            .catch(error => console.error('Error updating booking:', error));
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h2 className="my-4">Manage Bookings</h2>
                    <ListGroup>
                        {bookings.map(booking => (
                            <ListGroup.Item key={booking._id}>
                                <Row>
                                    <Col xs={10}>
                                        {booking.userId && booking.userId.firstName ? `${booking.userId.firstName} booked ${booking.venueName} on ${dayjs(booking.eventDate).format('DD MMM YYYY')} | Status: ${booking.status === 'green' ? <span className='text-success'>Confirmed</span> : booking.status === "blue" ? <span className='text-warning'>Pending</span> : <span className='text-danger'>Cancelled</span>}` : 'Unknown user'}
                                    </Col>
                                    <Col>
                                        <Button variant="info" onClick={() => handleShowModal(booking)}>Edit</Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>

            {
                showModal && 
                <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Booking</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="eventDate"
                                value={currentBooking.eventDate ? new Date(currentBooking.eventDate).toISOString().split('T')[0] : ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formStatus">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                as="select"
                                name="status"
                                value={currentBooking.status}
                                onChange={handleChange}
                            >
                                <option value="blue">Pending</option>
                                <option value="green">Confirmed</option>
                                <option value="red">Cancelled</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                    <Button variant="primary" onClick={handleSave}>Save</Button>
                </Modal.Footer>
            </Modal>
            }
        </Container>
    );
};

export default ManageBookings;

