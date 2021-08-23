import React from 'react';
import { View, Image, Text, KeyboardAvoidingView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';

import { TextField, Button } from './common';
import { loginFormChanged, registerUser } from '../actions';
import { textStyle } from '../style';

class RegisterView extends React.Component {
    onChangeEmailInput = (input) => {
        this.props.loginFormChanged({prop: 'email', value: input });
    }

    onChangePasswordInput = (input) => {
        this.props.loginFormChanged({ prop: 'password', value: input });
    }

    onRegisterButtonPress = () => {
        this.props.registerUser({ 
            email: this.props.email, 
            password: this.props.password
        });
    }

    renderErrorMessage = () => {
        if(this.props.error){
            return <Text style={[textStyle, {alignSelf: 'center', color: 'red'}]}>{this.props.errorMessage}</Text>
        }
    }

    // TODO: KeyboardAvoidingView not working as expected here
    render () {
        return (
            <LinearGradient colors={['#02ADB5', '#097e5b']} style={{flex: 1}} >
                <KeyboardAvoidingView style={styles.loginFormContainerStyle} behavior='position'>
                    <View style={{marginTop: '10%'}}>
                        <View style={[styles.imageContainerStyle]}>
                            <Image resizeMode='contain' style={{width: '100%', height: '100%'}} source={require('../../assets/images/ic_logo_splash.png')} />
                        </View>
                        <View style={{paddingLeft: 40, paddingRight: 40}}>
                            <Text style={textStyle}>Insira um Email e uma Senha para usar no aplicativo.</Text>
                            <TextField solid value={this.props.email} placeholder='Email' error={this.props.error}
                                onChangeText={this.onChangeEmailInput.bind(this)} />
                            <TextField solid value={this.props.password} placeholder='Senha' error={this.props.error} secureTextEntry 
                                onChangeText={this.onChangePasswordInput.bind(this)} />
                            <View style={{marginTop: 10, height: 20}}>
                                {this.renderErrorMessage()}
                            </View>
                            <Button label="CADASTRAR" onButtonPress={this.onRegisterButtonPress.bind(this)} loading={this.props.loading}/>
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
        width: '100%',
        height: '50%',
        paddingHorizontal: '10%',
        paddingBottom: 30,
        alignItems: 'center',
    }
}

const mapStateToProps = state => {
    const { password, email, loading } = state.session;

    let error = false, errorMessage = ''
    if(state.session.error){
        error = true;
        switch(state.session.error.code){
            case 'auth/email-already-in-use':
                errorMessage = 'Email já cadastrado';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Email inválido';
                break;
            case 'auth/weak-password':
                errorMessage = 'Senha deve conter 6 caracteres ou mais';
                break;
            default:
                errorMessage = 'Ocorreu um erro ao cadastrar';
                break;
        }
    }
    
    return {
        password,
        email,
        loading,
        error,
        errorMessage
    };
}

export default connect(mapStateToProps, { loginFormChanged, registerUser })(RegisterView);