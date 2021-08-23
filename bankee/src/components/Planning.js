import React from  'react';
import { View, Text } from 'react-native';

class Planning extends React.Component {
    render() {
        return (
            <View style={styles.containerStyle}>
                <Text>Planejamento</Text>
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        alignItems: 'center',
        backgroundColor:  '#f9f9f9',
        justifyContent: 'space-around'
    }
};

export default Planning;