import React from  'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { DropDownMenu } from './common';
import { Actions } from 'react-native-router-flux';
import { logout } from '../actions';
import { connect } from 'react-redux';

class HeaderMenu extends React.Component {
    about(){
        Actions.about();
    }

    logout(){
        this.props.logout();
    }

    dismiss(){
        Actions.pop();
    }

    isOpened(){ 
        return { isOpened: Actions.currentScene === this.props.key}
    }

    render() {
        return (
            <DropDownMenu onDismiss={this.dismiss.bind(this)}>
                <TouchableWithoutFeedback onPress={this.about.bind(this)}>
                    <View style={{padding: 15}}>
                        <Text>Sobre</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.logout.bind(this)}>
                    <View style={{padding: 15}}>
                        <Text>Sair</Text>
                    </View>
                </TouchableWithoutFeedback>
            </DropDownMenu>
        );
    }
}

export default connect(null, { logout })(HeaderMenu);