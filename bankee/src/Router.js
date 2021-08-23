import React from 'react';
import { connect } from 'react-redux';
import { Actions, Router, Scene, Tabs, Lightbox } from 'react-native-router-flux';

import LoginView from './components/LoginView';
import Dashboard from './components/Dashboard';
import Onboarding from './components/Onboarding';
import ChatBot from './components/ChatBot';
import Planning from './components/Planning';
import Profile from './components/Profile';
import Register from './components/Register';
import RegisterView from './components/RegisterView';
import NavigationTabItem from './components/NavigationTabItem';
import HeaderMenu from './components/HeaderMenu';
import About from './components/About';
import { Header } from './components/common';
import { saveUserDataCancel } from './actions';

class RouterComponent extends React.Component {
    isKeyInitialScene(key){
        return this.props.initial === key;
    }

    openHeaderMenu(){
        Actions.headerMenu();
    }

    onProfileExit(){
        this.props.saveUserDataCancel();
    }

    render() {
        return (
            <Router>
                <Lightbox>
                    <Scene key="root" hideNavBar>
                        <Scene key="init" hideNavBar type="replace" initial={this.isKeyInitialScene('onboarding')} >
                            <Scene key="onboarding" component={Onboarding} />
                        </Scene>
                        <Scene key="auth" type="replace" hideNavBar initial={this.isKeyInitialScene('login')}>
                            <Scene key="login" component={LoginView} />
                            <Scene key="registerView" iconLabel={require('../assets/images/img_logo_header.png')} component={RegisterView} noOptions />
                        </Scene>
                        <Scene key="register" type="replace" navBar={Header} initial={this.isKeyInitialScene('register')}>
                            <Scene key="registerSteps" iconLabel={require('../assets/images/img_logo_header.png')} component={Register} noOptions />
                        </Scene>
                        <Scene key="about" navBar={Header} initial={this.isKeyInitialScene('register')}>
                            <Scene key="registerSteps" iconLabel={require('../assets/images/img_logo_header.png')} component={About} noOptions />
                        </Scene>
                        <Tabs key="main" type="replace" navBar={Header} 
                            onOptions={this.openHeaderMenu.bind(this)} 
                            activeBackgroundColor="#02ADB5" 
                            inactiveBackgroundColor="#02ADB5" 
                            showLabel={false} 
                            icon={NavigationTabItem}
                            initial={this.isKeyInitialScene('main')}>
                                <Scene key="dashboard" component={Dashboard} label="Dashboard" iconSymbol={'\uf200'} />
                                <Scene key="chatbot" component={ChatBot} label="ChatBot" iconSymbol={'\uf27a'} />
                                <Scene key="profile" component={Profile} onExit={this.onProfileExit.bind(this)} label="Perfil" iconSymbol={'\uf406'} />
                        </Tabs>
                    </Scene>
                    <Scene key="headerMenu" component={HeaderMenu} />
                </Lightbox>
            </Router>
        );
    }
}

export default connect(null, { saveUserDataCancel })(RouterComponent);