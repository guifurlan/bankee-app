import {
    FETCH_USER_DATA_SUCCESS,
    SAVE_USER_DATA_SUCCESS,
    LOGOUT_USER_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {};

export default OnboardingReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LOGOUT_USER_SUCCESS:
            return { ...INITIAL_STATE }
        case SAVE_USER_DATA_SUCCESS:
            return { ...action.payload };
        case FETCH_USER_DATA_SUCCESS:
            return { ...action.payload };
        default:
            return state;
    }
};
