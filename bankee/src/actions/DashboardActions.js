import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';

import {FETCH_CARDS, FETCH_CARDS_SUCCESS, DELETE_CARD, DELETE_CARD_SUCCESS} from './types';

export const fetchCards = () => {
    const {currentUser} = firebase.auth();

    return (dispatch) => {
        dispatch({type: FETCH_CARDS});

        firebase.database().ref(`/users/${currentUser.uid}/cards`)
            .on('value', snapshot => {
                dispatch({type: FETCH_CARDS_SUCCESS, payload: snapshot.val()});
            });
    }
}

export const deleteCard = (cardUid) => {
    const {currentUser} = firebase.auth();

    return (dispatch) => {
        dispatch({type: DELETE_CARD});

        firebase.database().ref(`/users/${currentUser.uid}/cards/${cardUid}`)
            .remove(() => {
                dispatch({type: DELETE_CARD_SUCCESS});
            });
    }
}

