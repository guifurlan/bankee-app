import React from  'react';
import { View, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { textStyle } from '../style';

class About extends React.Component {
    render() {
        return (
            <LinearGradient colors={['#02ADB5', '#097e5b']} style={{flex: 1, alignItems: 'center'}} >
               <View style={{marginTop: 50}}>
                    <Image source={require('../../assets/images/img_logo_login.png')} />
               </View>
               <View style={{alignItems: 'center'}}>
                   <Text style={[textStyle, {fontWeight: 'bold'}]}> Versão 0.4.0 </Text>
                   <Text style={[textStyle, {color: '#f1f1f1'}]}> 2018 All rights reserved </Text>
                </View>
            </LinearGradient>
        );
    }
}

export default About;