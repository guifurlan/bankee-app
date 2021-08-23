import firebase from 'firebase';
import * as types from './types';

export const saveUserData = (register) => {
    const { currentUser } = firebase.auth();

    //TODO: Date created, lastModified
    const userData = {
        username: register.username,
        income: register.income,
        funds: register.funds,
        debt: register.debt,
        interest: register.interest,
        hasFunds: register.hasFunds,
        hasDebt: register.hasDebt,
        email: currentUser.email
    }

    return (dispatch) => {
        dispatch({ type: types.SAVE_USER_DATA });
        firebase.database().ref(`/users/${currentUser.uid}/userData`)
            .set(userData, () => {
                dispatch({ 
                    type: types.SAVE_USER_DATA_SUCCESS,
                    payload: userData
                });
            });
    };
}

export const saveUserDataCancel = () => {
    return {
        type: types.SAVE_USER_DATA_CANCEL
    }
}