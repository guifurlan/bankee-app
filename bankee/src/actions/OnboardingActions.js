import { Actions } from 'react-native-router-flux';

import * as types from './types';

export const nextScreen = (currentIndex, nextIndex) => {
    return {
        type: types.NEXT_SCREEN,
        payload: {currentIndex, nextIndex}    
    };
}

export const skipOnboarding = (index) => {
    Actions.auth();
    return {
        type: types.SKIP_ONBOARDING,
        payload: index
    };
}

export const continueToApp = (index) => {
    Actions.auth();
    return {
        type: types.CONTINUE_TO_APP,
        payload: index
    };
}
