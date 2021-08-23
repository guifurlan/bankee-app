import { 
    NEXT_REGISTER_STEP,
    SKIP_REGISTER_STEP,
    REGISTER_FORM_CHANGED,
    REGISTER_USER_SUCCESS,
    SESSION_REGISTERED,
    REGISTER_EDIT,
    REGISTER_STEPS,
    LOGOUT_USER_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    username: '',
    income: '',
    funds: '',
    debt: '',
    interest: '',
    previousStep: 0,
    currentStep: 0, 
    steps: 4,
    skip: false,
    hasFunds: false,
    hasDebt: false,
    error: false
};

export default RegisterReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case REGISTER_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE };
        case NEXT_REGISTER_STEP:
            return isFormValid(state, action.payload);
        case SKIP_REGISTER_STEP:
            return { ...state, currentStep: action.payload.nextStep, previousStep: action.payload.currentStep };
        case REGISTER_FORM_CHANGED:
            return { ...state, [action.payload.prop]: action.payload.value };
        case REGISTER_STEPS:
            return { ...state, ...INITIAL_STATE };
        case REGISTER_EDIT:
            return { ...state, ...action.payload };
        case LOGOUT_USER_SUCCESS:
            return { ...INITIAL_STATE };
        default:
            return state;
    }
};

const isFormValid = (state, payload) => {
    
    switch(payload.currentStep) {
        // Form 1 username is always required
        case 0: 
            if(!state.username || state.username.length === 0){
                return formError(state);
            }
            break;
        // Form 2 income is required unless user is skipping step
        case 1: 
            if(!state.income || state.income.length === 0){
                return formError(state);
            }
            break;
        // Form 3 funds are required if has funds is set as true
        case 2:
            if(state.hasFunds && (!state.funds || state.funds.length === 0)){
                return formError(state);
            }
            break;
        // Form 4 debt is required if hasDebt is set to true
        case 3: 
            if(state.hasDebt && (!state.debt || state.debt.length === 0)){
                return formError(state);
            }
            break;
    }

    return { ...state, currentStep: payload.nextStep, previousStep: payload.currentStep, error: false }
}

const formError = (state) => {
    return {...state, error: true}
}
