import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getOneVenue, getVenues } from '../../actions/venue.actions';
import { api, getPublicURL } from '../../urlConfig';
import { ImgsCard } from './ImgsCard';
import { useDispatch, useSelector } from 'react-redux';
import BookingModel from './BookingModel';
import axiosInstance from '../../helpers/axios';
import UpdateVenueModel from './UpdateVenueModel';
// import axios from 'axios';

const VenueCard = (props) => {

    const [bookingModalShow, setBookingModalShow] = useState(false);
    const [showUpdateVenueModal, setShowUpdateVenueModal] = useState(false);
    const { img1, img2, category, venueName, ownerId, _id, price, location, address, style, isDelete } = props;

    const auth = useSelector(state => state.auth);

    const dispatch = useDispatch()
    const getVenueInfo = () => {
        dispatch(getOneVenue(_id));
    }

    const handleDeleteVenue = () => {
        console.log(props,_id);
        axiosInstance.post('/venue-delete/'+ _id).then((res)=>{
            alert("Venue deleted successfully");
            dispatch(getVenues())
        });
    }

    const handleUpdate = () => {
        dispatch(getOneVenue(_id));
        setShowUpdateVenueModal(true)
    }

    return (
        <div className="card mb-4 box-shadow">
            <ImgsCard
                img1={getPublicURL(img1)}
                img2={getPublicURL(img2)}
                alt='venue picture'
                style={style}
            />
            <div className="card-body">
                <h6 className="card-subtitle mb-2 text-muted">{category}</h6>
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title">{venueName}</h5>
                    <h5 className="card-title">${price}</h5>
                </div>
                <h6 className="card-subtitle mb-2 text-muted">{location}, {address}</h6>

                <div className="d-flex justify-content-between align-items-center">
                    <Link to={`/venue/${_id}`} className="btn-group">
                        <Button variant="primary" size="sm" onClick={getVenueInfo}>Details</Button>{' '}
                    </Link>
                    {
                            auth.user.role === 'dealer' || auth.user.role === 'admin' ?
                            <>
                            <Button variant="primary" size="sm" onClick={() => handleUpdate()}>Update</Button>
                            <Button variant="danger" size="sm" onClick={() => handleDeleteVenue()}>Delete</Button>
                            </>
                                :
                                <Button variant="danger" size="sm" onClick={() => setBookingModalShow(true)}>Book</Button>
                    }
                    <BookingModel
                        _id={_id}
                        venueName={venueName}
                        price={price}
                        category={category}
                        address={address}
                        location={location}
                        show={bookingModalShow}
                        ownerId={ownerId}
                        onHide={() => setBookingModalShow(false)}
                    />
                    <UpdateVenueModel
                        show={showUpdateVenueModal}
                        onHide={()=> setShowUpdateVenueModal(false)}
                    />
                </div>
            </div>
        </div>
    )
}

export default VenueCard