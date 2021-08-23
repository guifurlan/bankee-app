import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { GoogleSignin } from 'react-native-google-signin';

import * as types from './types';

GoogleSignin.configure();

export const loginFormChanged = ({ prop, value }) => {
    return {
        type: types.LOGIN_FORM_CHANGED,
        payload: { prop, value }
    };
}

export const logout = () => {
    return (dispatch) => {
        dispatch({ type: types.LOGOUT_USER });
        firebase.auth().signOut()
            .then(() => {
                dispatch({ type: types.LOGOUT_USER_SUCCESS });
                Actions.auth();
            });
    };
}

/**
 * Login Actions
 */
export const loginUser = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: types.LOGIN_USER, payload: 'default' });
        
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(response => restoreSession(response.user))
            .catch(error => loginUserFail(dispatch, error));
    };
}

export const restoreSession = (user) => {
    return (dispatch) => {
        dispatch({ type: types.FETCH_USER_DATA });

        firebase.database().ref(`/users/${user.uid}/userData`)
            .once('value', (snapshot) => {
                const userData = snapshot.val();
                if(userData && userData.username){   
                    dispatch({
                        type: types.FETCH_USER_DATA_SUCCESS,
                        payload: userData
                    });
                    loginUserSuccess(dispatch, user);
                }
                else {
                    dispatch({ type: types.REGISTER_STEPS });
                    Actions.register();
                }
            });
    }
}

const loginUserSuccess = (dispatch, user) => {
    dispatch({ 
        type: types.LOGIN_USER_SUCCESS, 
        payload: user
    });
    Actions.main();
}

const loginUserFail = (dispatch, error) => {
    dispatch({ 
        type: types.LOGIN_USER_FAIL, 
        payload: error 
    });
}

/**
 * Google signin
 */
export const loginUserWithGoogle = () => {
    return (dispatch) => {
        dispatch({ type: types.LOGIN_USER, payload: 'google' });
        
        GoogleSignin.signIn()
            .then(response => loginWithCredentials(dispatch, response))
            .catch(error => loginUserFail(dispatch, error));
    };
}

const loginWithCredentials = (dispatch, response) => {
    const credential = firebase.auth.GoogleAuthProvider.credential(response.idToken, response.accessToken);

    firebase.auth().signInAndRetrieveDataWithCredential(credential)
        .then(response => restoreSession(response.user))
        .catch(error => loginUserFail(dispatch, error));
}

/**
 * Register account actions
 */
export const registerUser = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: types.REGISTER_USER });
        
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => registerUserSuccess(dispatch, user))
            .catch(error => registerUserFail(dispatch, error));
    };
}

const registerUserSuccess = (dispatch, user) => {
    dispatch({ 
        type: types.REGISTER_USER_SUCCESS, 
        payload: user 
    });
    Actions.register();
}

const registerUserFail = (dispatch, error) => {
    dispatch({ 
        type: types.REGISTER_USER_FAIL, 
        payload: error 
    });
}
