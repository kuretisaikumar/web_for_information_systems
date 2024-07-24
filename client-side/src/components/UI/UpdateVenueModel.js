import React, { useEffect, useState } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import Input from './Input';
import { updateVenue } from '../../actions/venue.actions';
import { useDispatch, useSelector } from 'react-redux';
import MessageBox from './MessageBox';
import categories from '../../assets/data/categories'
import axios from 'axios';

const UpdateVenueModel = (props) => {

    const dispatch = useDispatch();
    const updateVenueStatus = useSelector(state => state.updateVenueStatus);
    const oneVenueInfo = useSelector(state => state.oneVenueInfo);
    const { _id, venueName, description, address, location, category, price, venuePictures, ownerInfo, ownerId } = oneVenueInfo.venue;
    // const [venueName, setVenueName] = useState('');
    // const [location, setLocation] = useState('');
    // const [address, setAddress] = useState('');
    // const [description, setDescription] = useState('');
    // const [price, setPrice] = useState('');
    // const [category, setCategory] = useState('');
    const [updatedVenuePictures, setUpdatedVenuePictures] = useState([]);
    const [messageModalShow, setMessageModalShow] = useState(false);
    const [updatedData, setUpdatedData] = useState({
        venueName: venueName,
        location: location,
        description: description,
        address: address,
        category: category,
        price: price
    })

    useEffect(()=>{
        setUpdatedData({
            venueName: venueName,
            location: location,
            description: description,
            address: address,
            category: category,
            price: price
        });
    },[oneVenueInfo])

    const handleVenuePictures = (e) => {
        setUpdatedVenuePictures([
            ...venuePictures,
            e.target.files[0]
        ])
    }

    const handleOnchange = (key,value) => {
        setUpdatedData((data)=>({
            ...data,
            [key]: value
        }))
    }

    const handleSUbmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('venueName', updatedData.venueName);
        form.append('location', updatedData.location);
        form.append('address', updatedData.address);
        form.append('description', updatedData.description);
        form.append('price', updatedData.price);
        form.append('category', updatedData.category);

        // for (let picture of venuePictures) {
        //     form.append('venuePicture', picture);
        // }
        console.log(form);
        dispatch(updateVenue(form,_id));
        setMessageModalShow(true);
    }

    return (
        <>
            <MessageBox
                show={messageModalShow}
                onHide={() => setMessageModalShow(false)}
                message={updateVenueStatus.message}
            />
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Update Venue
                    </Modal.Title>
                    <Button onClick={props.onHide} >X</Button>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSUbmit}>
                        <Row>
                            <Col md={6}>
                                <Input
                                    label='Venue Name'
                                    type='text'
                                    placeholder='Name of venue'
                                    value={updatedData.venueName}
                                    onChange={(e) => handleOnchange('venueName',e.target.value)}
                                />
                            </Col>
                            <Col md={6}>
                                <Input
                                    label='Location'
                                    type='text'
                                    placeholder='Location'
                                    value={updatedData.location}
                                    onChange={(e) => handleOnchange('location',e.target.value)}
                                />
                            </Col>
                        </Row>
                        <Input
                            label='Address'
                            type='text'
                            placeholder='Area, Street Name'
                            value={updatedData.address}
                            onChange={(e) => handleOnchange('address',e.target.value)}
                        />
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder='Keep it under 30 words'
                                value={updatedData.description}
                                onChange={(e) => handleOnchange('description',e.target.value)}
                            />
                        </Form.Group>
                        <Row>
                            <Col md={6}>
                                <Input
                                    label='Price'
                                    type='number'
                                    placeholder='Price in Dollar'
                                    value={updatedData.price}
                                    onChange={(e) => handleOnchange('price', e.target.value)}
                                />
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Category</Form.Label>
                                    <select class="form-select" value={updatedData.category} required onChange={(e) => handleOnchange('category',e.target.value)}>
                                        <option selected>-Select-</option>
                                        {
                                            categories.map((category) => {
                                                return (
                                                    <option value={category}>{category}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* <div class="mb-3">
                            <label for="formFile" class="form-label">Venue Pictures</label>
                            <input class="form-control" type="file" id="formFile" onChange={handleVenuePictures} />
                        </div>
                        <p>Uploaded pictures will display here -</p>

                        {
                            venuePictures.length > 0 ?
                                venuePictures.map((picture) => {
                                    return (
                                        <p className="text-muted">{picture.name}</p>
                                    )
                                }) : null
                        } */}

                        <Button variant="success" type="submit" style={{ marginRight: '10px' }} onClick={props.onHide}>Update</Button>
                        <Button variant="danger" type="reset" style={{ marginLeft: '10px' }} onClick={()=> props.onHide()}>Close</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default UpdateVenueModel
