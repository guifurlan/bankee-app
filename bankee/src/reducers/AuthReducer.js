import {
    LOGIN_FORM_CHANGED,
    LOGIN_USER_SUCCESS, 
    LOGIN_USER_FAIL, 
    LOGIN_USER, 
    LOGOUT_USER_SUCCESS,
    REGISTER_USER_FAIL,
    REGISTER_USER_SUCCESS,
    REGISTER_USER,
    REGISTER_VIEW,
    LOGIN_USER_GOOGLE
} from '../actions/types';

const INITIAL_STATE = { 
    email: '', 
    password: '', 
    user: null, 
    loading: false, 
    error: null, 
    signinType: 'default'
};

export default AuthReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LOGIN_FORM_CHANGED:
            return { ...state, [action.payload.prop]: action.payload.value };
        case LOGIN_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, user: action.payload };
        case LOGIN_USER_FAIL:
            return { ...state, loading: false, password: '', error: action.payload };
        case LOGIN_USER:
            return { ...state, error: null, loading: true, signinType: action.payload };
        case REGISTER_USER:
            return { ...state, loading: true, error: null };
        case REGISTER_USER_FAIL:
            return { ...state, loading: false, password: '', error: action.payload };
        case REGISTER_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, user: action.payload };
        case REGISTER_VIEW:
            return { ...state, ...INITIAL_STATE };
        case LOGOUT_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE };
        default:
            return state;
    }
};
