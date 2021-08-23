import React from  'react';
import { View } from 'react-native';

class NavigationBar extends React.Component {
    render() {
        return (
            <View style={styles.navigationContainerStyle}>
                {this.props.children}
            </View>
        );
    }
}

const styles = {
    navigationContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor:  '#02ADB5',
        height:  50
    }
};

export { NavigationBar };