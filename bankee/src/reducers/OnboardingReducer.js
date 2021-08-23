import {
    NEXT_SCREEN,
    SKIP_ONBOARDING,
    CONTINUE_TO_APP
} from '../actions/types';

const INITIAL_STATE = {
    previousIndex: 0, 
    currentIndex: 0,
    skipped: false,
    continue: false
};

export default OnboardingReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case NEXT_SCREEN:
            return { ...state, previousIndex: action.payload.currentIndex, currentIndex: action.payload.nextIndex };
        case SKIP_ONBOARDING:
            return { ...state, skipped: true, continue: true };
        case CONTINUE_TO_APP:
            return { ...state, continue: true };
        default:
            return state;
    }
};
