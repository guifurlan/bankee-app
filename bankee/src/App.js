import React from 'react';
import { AsyncStorage, AppState, View, Text, ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import Router from './Router';
import reducers from './reducers';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            isStoreLoading: true
        };
    }

    /**
     * Method responsible for handling app state events
     * possible states: active, background, inactive
     * @param currentAppState string representing the app state
     */
    _handleAppStateChange(currentAppState){
        if(this.state.store){
            let stateJson = JSON.stringify(
                this._purgeState(this.state.store.getState())
            );
            AsyncStorage.setItem('state', stateJson);
        }
    }

    // Purges unwanted information from state
    _purgeState(state){
        let purgedState = {};
        purgedState.onboarding = state.onboarding;
        purgedState.session = state.session;

        // Remove any leftover input
        purgedState.session.email = '';
        purgedState.session.password = '';
        purgedState.session.error = null;
        purgedState.session.loading = false;

        return purgedState;
    }

    componentWillUnmount(){
        AppState.removeEventListener('change', this._handleAppStateChange.bind(this));
    }

    componentWillMount(){
        AppState.addEventListener('change', this._handleAppStateChange.bind(this));

        const config = {
            apiKey: "AIzaSyDNU2Q7JXCZ0LDRhxIVFQuwTsmvRgdVJnQ",
            authDomain: "bankee-app.firebaseapp.com",
            databaseURL: "https://bankee-app.firebaseio.com",
            projectId: "bankee-app",
            storageBucket: "bankee-app.appspot.com",
            messagingSenderId: "301096829668"
        };

        if (!firebase.apps.length) { 
            firebase.initializeApp(config);
        }

        this.getStoredState();
    }

    /**
     * Method retrieves any state stored in the async storage and creates the app redux store
     */
    getStoredState = () => {
        let loadedState = {};

        try {
            AsyncStorage.getItem('state').then(stateJson => {
                if (stateJson) {
                    loadedState = JSON.parse(stateJson);
                }
                this.createAppStore(loadedState);
            }).catch(error => { 
                this.createAppStore();
            });
        } catch (error) {
            this.createAppStore();
        }
    }

    /**
     * Method creates the app and jumps onboarding if it is the case
     */
    createAppStore(state = {}){
        initialScene = 'onboarding';
        if(state.onboarding && state.onboarding.continue){
            initialScene = 'login';
        }
        
        this.setState({
            ...this.state,
            isStoreLoading: false, 
            initialScene,
            store: createStore(reducers, state, applyMiddleware(ReduxThunk))
        });
    }

    render() {
        // TODO: turn loading into prolonged splash screen or some more fancy loading indicator
        if(this.state.isStoreLoading){
            return (
                <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: '#02ADB5'}}>
                    <ActivityIndicator />
                </View>
            );
        }
        else{
            return (
                <Provider store={this.state.store}>
                    <Router initial={this.state.initialScene} />
                </Provider>
            );
        }
    }
}

export default App;