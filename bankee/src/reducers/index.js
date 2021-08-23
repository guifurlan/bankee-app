import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import OnboardingReducer from './OnboardingReducer';
import RegisterReducer from './RegisterReducer';
import DashboardReducer from './DashboardReducer';
import ProfileReducer from './ProfileReducer';
import UserDataReducer from './UserDataReducer';

export default combineReducers({
    session: AuthReducer,
    onboarding: OnboardingReducer,
    register: RegisterReducer,
    dashboard: DashboardReducer,
    profile: ProfileReducer,
    userData: UserDataReducer
});