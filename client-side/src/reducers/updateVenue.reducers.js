import { updateVenueConstants } from '../actions/constants';

const initialState = {
    error: null,
    message: '',
    saving: false
}

const updateVenueReducer = (state = initialState, action) => {
    switch (action.type) {
        case updateVenueConstants.UPDATE_VENUE_REQUEST:
            state = {
                ...state,
                saving: true,
            }
            break;

        case updateVenueConstants.UPDATE_VENUE_SUCCESS:
            state = {
                ...state,
                saving: false,
                message: '🎉Venue updated successfully! Refresh this page'
            }
            break;

        case updateVenueConstants.UPDATE_VENUE_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                message: action.payload.msg,
                saving: false
            }
            break;

        default:
            break;
    }
    return state;
}

export default updateVenueReducer;