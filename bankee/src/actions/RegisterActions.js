import { Actions } from 'react-native-router-flux';
import * as types from './types';

export const nextRegisterStep = (currentStep) => {
    return {
        type: types.NEXT_REGISTER_STEP,
        payload: {currentStep, nextStep: currentStep + 1}    
    };
}

export const skipRegisterStep = (currentStep) => {
    return {
        type: types.SKIP_REGISTER_STEP,
        payload: {currentStep, nextStep: currentStep + 1}
    };
}

export const confirmRegister = () => {
    Actions.main();
    return {
        type: types.CONFIRM_REGISTER
    };
}

export const registerEdit = (registerData) => {
    const register = {
        ...registerData,
        income: registerData.income.replace(/\D/g,''),
        debt: registerData.debt.replace(/\D/g,''),
        funds: registerData.funds.replace(/\D/g,''),
        interest: registerData.interest.replace(/\D/g,''),
    }

    return {
        type: types.REGISTER_EDIT,
        payload: register
    }
}

// TODO: improve regex to allow one comma in case of currency input
export const registerFormChanged = (prop, value, numeric = false) => {
    if(numeric && value){
        value = value.replace(/\D/g,'');
    }

    return {
        type: types.REGISTER_FORM_CHANGED,
        payload: {prop, value}
    };
}

export const onRegister = () => {
    Actions.registerView();
    return { 
        type: types.REGISTER_VIEW
    };
}