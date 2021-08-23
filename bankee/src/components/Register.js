import React from  'react';
import LinearGradient from 'react-native-linear-gradient';
import { View, Image, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import { StepIndicator, TextField, CheckBox } from './common';
import RegisterForm from './RegisterForm';
import * as actions from '../actions';
import { formatCurrency, parseIntString, fillLeftZeroes } from '../utils';

// TODO: maybe this form has too many logic in it
//       it may be possible to transfer some of it to the Router or the Reducers
class Register extends React.Component {
    componentDidMount(){
        setTimeout(() => SplashScreen.hide(), 1000);
    }

    // Form control

    getStepBackgroundImage(step) {
        switch (step) {
            case 0:
                return require('../../assets/images/img_cadastro_1.png');
            case 1:
            case 2:
            case 3:
                return require('../../assets/images/img_cadastro_2.png');
            default:
                return require('../../assets/images/img_cadastro_1.png');
        }
    }
    
    getFormFromIndex(index){
        switch(index){
            case 0:
                return this.getRegisterForm();
            case 1:
                return this.getIncomeForm();
            case 2:
                return this.getFundsForm();
            case 3:
                return this.getDebtForm();
            default:
                return this.getRegisterForm();
        }
    }

    // Form views

    getRegisterForm(){
        return (
            <RegisterForm onNext={this.nextStep.bind(this)} title="Dados cadastrais">
                <TextField value={this.props.username} error={this.props.error} onChangeText={this.onChangeUsername.bind(this)} title='Nome de usuário' outlineColor='#BCBCBC' />
            </RegisterForm>
        );
    }

    getIncomeForm(){
        return (
            <RegisterForm canSkip onSkip={this.skipStep.bind(this)} onNext={this.nextStep.bind(this)} title="Qual sua renda mensal?">
                <TextField keyboardType='numeric' error={this.props.error} value={this.props.income} onChangeText={this.onChangeIncome.bind(this)} outlineColor='#BCBCBC' />
            </RegisterForm>
        );
    }

    getFundsForm(){
        const hasFunds = this.props.hasFunds;

        return (
            <RegisterForm canSkip onSkip={this.skipStep.bind(this)} onNext={this.nextStep.bind(this)} title="Você possui fundo de garantia?">
                <View style={{flexDirection: 'row'}}>
                    <CheckBox onSelect={() => this.setHasFunds(true)} isSelected={hasFunds} label="Sim" />
                    <CheckBox onSelect={() => this.setHasFunds(false)} isSelected={!hasFunds} label="Não" />
                </View>
                {
                    ((hasFunds) => {
                        if(hasFunds){
                            return <TextField error={this.props.error} keyboardType="numeric" titleColor='#161616' title="Ok! Qual é o valor total do seu fundo de garantia?"
                                     value={this.props.funds} onChangeText={this.onChangeFunds.bind(this)} outlineColor='#BCBCBC' />
                        }
                    })(hasFunds)
                }
            </RegisterForm>
        );
    }

    getDebtForm(){
        const hasDebt = this.props.hasDebt;
        return (
            <RegisterForm canSkip onSkip={this.skipStep.bind(this)} onNext={this.nextStep.bind(this)} title="Você possui dividas atualmente?">
                <View style={{flexDirection: 'row'}}>
                    <CheckBox onSelect={() => this.setHasDebt(true)} isSelected={hasDebt} label="Sim" />
                    <CheckBox onSelect={() => this.setHasDebt(false)} isSelected={!hasDebt} label="Não" />
                </View>
                {
                    ((hasDebt) => {
                        if(hasDebt){
                            return (
                                <View>
                                    <TextField error={this.props.error} keyboardType='numeric' titleColor='#161616' title="Qual é o valor total das suas dívidas atuais?"
                                        value={this.props.debt} onChangeText={this.onChangeDebt.bind(this)} outlineColor='#BCBCBC' />
                                    <TextField keyboardType='numeric' titleColor='#161616' title="Qual é a porcentagem total de juros?"
                                        value={this.props.interest} onChangeText={this.onChangeInterest.bind(this)} outlineColor='#BCBCBC' />
                                </View>
                            );
                        }
                    })(hasDebt)
                }
            </RegisterForm>
        );
    }

    // Form actions

    nextStep(){
        this.props.nextRegisterStep(this.props.currentStep);
    }

    skipStep(){
        this.props.skipRegisterStep(this.props.currentStep);
    }

    onChangeUsername(text){
        this.props.registerFormChanged('username', text);
    }

    onChangeIncome(text){
        this.props.registerFormChanged('income', text, true);
    }

    onChangeFunds(text){
        this.props.registerFormChanged('funds', text, true);
    }

    onChangeDebt(text){
        this.props.registerFormChanged('debt', text, true);
    }

    onChangeInterest(text){
        this.props.registerFormChanged('interest', text, true);
    }

    setHasFunds(value){
        this.props.registerFormChanged('hasFunds', value);
    }

    setHasDebt(value){
        this.props.registerFormChanged('hasDebt', value);
    }

    onConfirmRegister(){
        this.props.confirmRegister();
    }

    isLastStep(){
        if(this.props.isLastStep){
            this.props.saveUserData(this.props);
        }
        return this.props.isLastStep;
    }

    render({currentStep, steps} = this.props) {
        return (
            !this.isLastStep() ?
                <View style={styles.containerStyle}>
                    <View style={styles.stepsContainerStyle}>
                        <StepIndicator index={currentStep} steps={steps} />
                    </View>
                    <View style={[styles.stepImageStyle]} >
                        <Image resizeMode='contain' style={{height: '100%', width: '100%'}} source={this.getStepBackgroundImage(currentStep)} />
                    </View>
                    <View style={{flex: 8}}>
                        {this.getFormFromIndex(currentStep)}
                    </View>
                </View>
                :
                <TouchableWithoutFeedback onPress={this.onConfirmRegister.bind(this)}>
                     <LinearGradient colors={['#02ADB5', '#097e5b']} style={{flex: 1, alignItems: 'flex-end', paddingTop: 20}}>
                        <Image style={{height: '100%'}} source={require('../../assets/images/img_cadastro_finalizado.png')} />
                    </LinearGradient>
                </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        backgroundColor: '#f9f9f9'
    },
    stepsContainerStyle: {
        position: 'absolute',
        width: '100%'
    },
    stepImageStyle: {
        marginLeft: 10,
        flex: 7
    },
    stepFormStyle: {
        flex: 1,
        paddingHorizontal: 20
    },
    formButtonsContainer: {
        flexDirection: 'row-reverse',
        width: '100%',
        paddingVertical: 20,
        justifyContent: 'space-between'
    }
};

// TODO: toLocaleString is not working on Android https://github.com/facebook/react-native/issues/19410
//       find another way to show formatted number input
const mapStateToProps = (state) => {
    const { 
        currentStep, 
        steps, 
        username,
        hasFunds, 
        hasDebt, 
        skip,
        error
    } = state.register

    // Format number inputs
    const income = formatCurrency(parseIntString(state.register.income));
    const debt = formatCurrency(parseIntString(state.register.debt));
    const funds = formatCurrency(parseIntString(state.register.funds));
    const interest = parseIntString(fillLeftZeroes(state.register.interest, 1)) + '%';
    const isLastStep = (steps === currentStep);

    return { 
        currentStep, 
        steps, 
        username,
        hasFunds, 
        hasDebt, 
        skip,
        error,
        income,
        debt,
        funds,
        interest,
        isLastStep
    };
}

export default connect(mapStateToProps, actions)(Register);