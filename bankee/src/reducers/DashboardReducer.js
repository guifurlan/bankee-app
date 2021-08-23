import {
    FETCH_CARDS,
    FETCH_CARDS_SUCCESS,
    LOGOUT_USER_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    cards: {},
    fetchingCards: false
};

export default OnboardingReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LOGOUT_USER_SUCCESS:
            return { ...INITIAL_STATE };
        case FETCH_CARDS:
            return { ...state, fetchingCards: true }
        case FETCH_CARDS_SUCCESS:
            return { ...state, fetchingCards: false, cards: action.payload }
        default:
            return state;
    }
};
