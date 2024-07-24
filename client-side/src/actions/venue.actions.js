import { venueConstants, updateVenueConstants, addVenueConstants } from "./constants";
import axios from '../helpers/axios';

const addVenue = (form) => {
    return async (dispatch) => {
        dispatch({
            type: addVenueConstants.ADD_VENUE_REQUEST
        });

        const res = await axios.post(`/create-venue`, form);

        if (res.status === 201) {
            dispatch({
                type: addVenueConstants.ADD_VENUE_SUCCESS,
                payload: res.data._venue
            });
        } else {
            dispatch({
                type: addVenueConstants.ADD_VENUE_FAILURE,
                payload: {
                    msg: res.data.msg,
                    error: res.data.error
                }
            });
        }
    }
}

const updateVenue = (form,id) => {
    return async (dispatch) => {
        dispatch({
            type: updateVenueConstants.UPDATE_VENUE_REQUEST
        });

        const res = await axios.post(`/venue-update/`+ id, form);

        if (res.status === 200) {
            dispatch({
                type: updateVenueConstants.UPDATE_VENUE_SUCCESS,
                payload: res.data._venue
            });
        } else {
            dispatch({
                type: updateVenueConstants.UPDATE_VENUE_FAILURE,
                payload: {
                    msg: res.data.msg,
                    error: res.data.error
                }
            });
        }
    }
}

const getVenues = (query) => {
    return async (dispatch) => {
        dispatch({
            type: venueConstants.GETALL_VENUES_REQUEST
        });

        const res = await axios.get(`/all-venues`, { params: { query } });

        if (res.status === 200) {
            dispatch({
                type: venueConstants.GETALL_VENUES_SUCCESS,
                payload: res.data.allVenues
            });
        } else {
            dispatch({
                type: venueConstants.GETALL_VENUES_FAILURE,
                payload: {
                    msg: res.data.msg
                }
            });
        }
    }
}

const getOneVenue = (id) => {
    return async (dispatch) => {
        dispatch({
            type: venueConstants.GETONE_VENUE_REQUEST
        });

        const res = await axios.get(`/venue/${id}`);

        if (res.status === 200) {
            dispatch({
                type: venueConstants.GETONE_VENUE_SUCCESS,
                payload: {
                    venue: res.data._venue
                }
            });
        } else {
            dispatch({
                type: venueConstants.GETONE_VENUE_FAILURE,
                payload: {
                    msg: res.data.msg
                }
            });
        }
    }
}

const getOwnerVenues = (ownerId) => {
    return async (dispatch) => {
        dispatch({
            type: venueConstants.GETALL_VENUES_OF_DEALER_REQUEST
        });

        const res = await axios.get(`/venues/${ownerId}`);

        if (res.status === 200) {
            dispatch({
                type: venueConstants.GETALL_VENUES_OF_DEALER_SUCCESS,
                payload: res.data._allvenues
            });
        } else {
            dispatch({
                type: venueConstants.GETALL_VENUES_OF_DEALER_FAILURE,
                payload: {
                    msg: res.data.msg,
                    error: res.data.error
                }
            });
        }
    }
}

export {
    addVenue,
    getVenues,
    getOneVenue,
    getOwnerVenues,
    updateVenue
}