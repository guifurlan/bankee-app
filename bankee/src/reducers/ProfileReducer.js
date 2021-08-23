import {
    SAVE_USER_DATA,
    SAVE_USER_DATA_SUCCESS,
    SAVE_USER_DATA_CANCEL,
    REGISTER_EDIT
} from '../actions/types';

const INITIAL_STATE = {
    loading: false,
    isEditing: false
};

export default OnboardingReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case REGISTER_EDIT:
            return { ...state, isEditing: true };
        case SAVE_USER_DATA:
            return { ...state, loading: true, isEditing: false }
        case SAVE_USER_DATA_SUCCESS:
            return { ...state, ...INITIAL_STATE }
        case SAVE_USER_DATA_CANCEL:
            return { ...state, ...INITIAL_STATE }
        default:
            return state;
    }
};
