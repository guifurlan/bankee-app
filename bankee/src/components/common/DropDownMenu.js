import React from 'react';
import { View, Text, TouchableWithoutFeedback, ActivityIndicator, Animated, Easing } from 'react-native';

class DropDownMenu extends React.Component {
    state = { width: new Animated.Value(0), height: new Animated.Value(0) };

    // TODO: Width and height manually set, should adapt to children content
    animatedOpen(){
        Animated.timing(        
            this.state.width,
            {
              toValue: 150,
              duration: 200,
              easing: Easing.inOut(Easing.cubic)
            }
        ).start();
        Animated.timing(        
            this.state.height,
            {
              toValue: 100,
              duration: 300,
              easing: Easing.inOut(Easing.cubic)
            }
        ).start();
    }

    // TODO: make width and height adapt to children content automatically
    render() {
        this.animatedOpen();

        return (
            <TouchableWithoutFeedback onPress={this.props.onDismiss}>
                <View style={{flexDirection: 'row-reverse', flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.2)', padding: 10, position: 'absolute', width: '100%', height: '100%'}}>
                    <Animated.View style={[styles.containerStyle, { width: this.state.width, height: this.state.height }]}>
                        <View>
                            {this.props.children.map((child, i) => 
                                <View key={i}>{child}</View>
                            )}
                        </View>
                    </Animated.View>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    _setMaxHeight(event){
        this.setState({
            ...this.state,
            maxHeight: event.nativeEvent.layout.height
        });
    }
};

const styles = {
    containerStyle: {
        borderRadius: 5,
        backgroundColor: '#eee',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5
    }
}

export { DropDownMenu };