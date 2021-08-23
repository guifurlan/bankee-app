import React from  'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import { textStyle } from '../style'
import { Swiper } from './common';

import * as actions from '../actions';

class Onboarding extends React.Component {
    componentDidMount() {
        SplashScreen.hide();
    }

    skipOnboarding(){
        this.props.skipOnboarding(this.props.currentIndex);
    }

    continueToApp(){
        this.props.continueToApp(this.props.currentIndex);
    }

    nextScreen(nextIndex){
        this.props.nextScreen(this.props.currentIndex, nextIndex);
    }

    render() {
        return (
            <Swiper index={this.props.currentIndex} 
                    skip={() => this.skipOnboarding()}
                    next={(nextIndex) => this.nextScreen(nextIndex)}
                    continue={() => this.continueToApp()}>
                <View style={styles.pagerStepContainerStyle} key="1">
                    <View style={styles.imageContainerStyle}>
                        <Image resizeMode='contain' style={styles.imageStyle} source={require('../../assets/images/img_introducao_1.png')} />
                    </View>
                    <View style={styles.textContainerStyle}>
                        <Text style={[ textStyle, styles.textStyle]}>O Bankee ajuda você a controlar</Text>
                        <Text style={[textStyle, styles.textStyle]}>suas metas financeiras</Text>
                    </View>
                </View>
                <View style={styles.pagerStepContainerStyle} key="2">
                    <View style={styles.imageContainerStyle}>
                        <Image resizeMode='contain' style={styles.imageStyle} source={require('../../assets/images/img_introducao_2.png')} />
                    </View>
                    <View style={styles.textContainerStyle}>
                        <Text style={[textStyle, styles.textStyle]}>Cadastre seus dados financeiros</Text>
                        <Text style={[textStyle, styles.textStyle]}>para o Bankee se adaptar a você!</Text>
                    </View>
                </View>
                <View style={styles.pagerStepContainerStyle} key="2">
                    <View style={styles.imageContainerStyle}>
                        <Image resizeMode='contain' style={styles.imageStyle} source={require('../../assets/images/img_introducao_3.png')} />
                    </View>
                    <View style={styles.textContainerStyle}>
                        <Text style={[textStyle, styles.textStyle]}>Através do dashboard, acompanhe</Text>
                        <Text style={[textStyle, styles.textStyle]}>a evolução das suas metas, assim</Text>
                        <Text style={[textStyle, styles.textStyle]}>como informações financeiras que</Text>
                        <Text style={[textStyle, styles.textStyle]}>você se interessar</Text>
                    </View>
                </View>
                <View style={styles.pagerStepContainerStyle} key="2">
                    <View style={styles.imageContainerStyle}>
                        <Image resizeMode='contain' style={styles.imageStyle} source={require('../../assets/images/img_introducao_4.png')} />
                    </View>
                    <View style={styles.textContainerStyle}>
                        <Text style={[textStyle, styles.textStyle]}>Também consiga, através do chatbot,</Text>
                        <Text style={[textStyle, styles.textStyle]}>informações sobre investimentos,</Text>
                        <Text style={[textStyle, styles.textStyle]}>metas, dívidas e processos de quitação e</Text>
                        <Text style={[textStyle, styles.textStyle]}>informações de mercado e investimento</Text>
                    </View>
                </View>
            </Swiper>
        );
    }
}

const styles = {
    pagerStepContainerStyle: {
        flex: 1
    },
    imageContainerStyle: {
        flex: 3, 
        marginTop: '15%'
    },
    imageStyle: {
        width: '100%',
        height: '100%'
    },
    textContainerStyle: {flex:2, alignItems: 'center', marginTop: 40},
    textStyle: { fontSize: 18 }
};

const mapStateToProps = (state) => {
    return { 
        currentIndex: state.onboarding.currentIndex,
        continue: state.onboarding.continue
    }
}

export default connect(mapStateToProps, actions)(Onboarding);