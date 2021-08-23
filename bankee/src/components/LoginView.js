import React from 'react';
import { View, Image, Text, TouchableWithoutFeedback, KeyboardAvoidingView, NetInfo } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { GoogleSigninButton } from 'react-native-google-signin';
import firebase from 'firebase';
import SplashScreen from 'react-native-splash-screen';

import { TextField, Button } from './common';
import { loginFormChanged, loginUser, onRegister, loginUserWithGoogle, restoreSession } from '../actions';
import { textStyle } from '../style';

class LoginView extends React.Component {
    authStateListenerDisposable = null;

    // When entering login view starts listening for login state change
    componentWillMount(){
        // Wait for session to be retrieved by firebase
        this.authStateListenerDisposable = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // If logged in, calls the restore session action
                this.props.restoreSession(user);
            }
            else {
                // Otherwise show the login view
                SplashScreen.hide();
            }
        });

        // Show login view if user has no internet connection
        NetInfo.getConnectionInfo().then((connectionInfo) => {
            if(connectionInfo.type === 'none'){
                SplashScreen.hide();
            }
        });
    }

    // Disposes the listener
    componentWillUnmount(){
        if(this.authStateListenerDisposable){
            this.authStateListenerDisposable();
        }
    }

    onChangeEmailInput = (input) => {
        this.props.loginFormChanged({ prop: 'email', value: input});
    }

    onChangePasswordInput = (input) => {
        this.props.loginFormChanged({ prop: 'password', value: input});
    }

    onLoginButtonPress = () => {
        this.props.loginUser({ 
            email: this.props.email, 
            password: this.props.password
        });
    }

    onRegister = () => {
        this.props.onRegister();
    }

    renderErrorMessage = () => {
        if(this.props.error && this.props.defaultSignin){
            return <Text style={[textStyle, {alignSelf: 'center', color: 'red'}]}>{this.props.errorMessage}</Text>
        }
    }

    renderGoogleErrorMessage = () => {
        if(this.props.error && this.props.googleSignin){
            return <Text style={[textStyle, {alignSelf: 'center', color: 'red'}]}>{this.props.errorMessage}</Text>
        }
    }

    // TODO: KeyboardAvoidingView not working as expected here
    render () {
        return (
            <LinearGradient colors={['#02ADB5', '#097e5b']} style={{flex: 1}} >
                <KeyboardAvoidingView style={styles.loginFormContainerStyle} behavior='padding'>
                    <View style={{marginTop: '10%'}}>
                        <View style={styles.imageContainerStyle}>
                            <Image source={require('../../assets/images/img_logo_login.png')} />
                        </View>
                        <View style={{paddingLeft: 40, paddingRight: 40}}>
                            <TextField value={this.props.email} placeholder='e-mail' error={this.props.error && this.props.defaultSignin}
                                onChangeText={this.onChangeEmailInput.bind(this)} icon={require('../../assets/images/ic_usuario.png')} />
                            <TextField value={this.props.password} placeholder='senha' error={this.props.error && this.props.defaultSignin} secureTextEntry 
                                onChangeText={this.onChangePasswordInput.bind(this)} icon={require('../../assets/images/ic_senha.png')} />
                            <View style={{marginTop: 10, height: 20}}>
                                {this.renderErrorMessage()}
                            </View>

                            <Button label="ENTRAR" 
                                onButtonPress={this.onLoginButtonPress.bind(this)} 
                                loading={this.props.loading && this.props.defaultSignin} 
                                disabled={this.props.loading && this.props.googleSignin}
                            />
                            
                            <View style={[{paddingVertical: 10, alignItems: 'center', flexDirection: 'row'}]}>
                                <View style={styles.horizontalBarStyle} />
                                <Text style={textStyle}>OU</Text>
                                <View style={styles.horizontalBarStyle} />
                            </View>
                            
                            <GoogleSigninButton
                                style={{ height: 48 }}
                                size={GoogleSigninButton.Size.Wide}
                                color={GoogleSigninButton.Color.Light}
                                onPress={this.props.loginUserWithGoogle}
                                disabled={this.props.loading} 
                            />
                            
                            <View style={{marginTop: 10, height: 20}}>
                                {this.renderGoogleErrorMessage()}
                            </View>

                        </View>
                    </View>
                    <View style={{marginVertical: 20, justifyContent: 'flex-end', alignItems: 'center'}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={[textStyle]}>Ainda não tem uma conta? </Text>
                            <TouchableWithoutFeedback onPress={this.onRegister.bind(this)}>
                                <View>
                                    <Text style={[textStyle, {fontWeight: 'bold', textDecorationLine: 'underline'}]}>
                                        Cadastre-se aqui
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </LinearGradient>
        );
    }
}

const styles = {
    loginFormContainerStyle: {
        flex: 1,
        justifyContent: 'space-between'
    },
    imageContainerStyle: {
        alignItems: 'center'
    },
    horizontalBarStyle: {
        flex: 1, 
        marginHorizontal: 10,
        height: 1, 
        borderBottomWidth: 1, 
        borderColor: '#F9F9F9' 
    }
}

const mapStateToProps = state => {
    const { email, password, loading, signinType } = state.session;

    var defaultSignin = signinType === 'default';
    var googleSignin = signinType === 'google';

    // TODO: improve error message to account for different scenarios
    let error = false, errorMessage = '';
    if(state.session.error){
        error = true;
        if(defaultSignin){
            errorMessage = 'E-mail e/ou senha inválidos.';
        }
        else {
            errorMessage = 'Algo deu errado, tente novamente.';
        }
    }

    return { email, password, loading, error, errorMessage, defaultSignin, googleSignin };
}

export default connect(mapStateToProps, {loginFormChanged, loginUser, loginUserWithGoogle, onRegister, restoreSession})(LoginView);