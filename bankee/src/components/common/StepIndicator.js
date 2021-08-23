import React, { Component } from 'react';
import {
  StyleSheet,        // CSS-like styles
  View,              // Container component
  Dimensions         // Device dimensions
} from 'react-native';

const deviceWidth = Dimensions.get('window').width;

class StepIndicator extends Component {
    render({index, steps} = this.props) {
        return (
            <View style={styles.container}>
                {this.renderSteps(index, steps)}
            </View>
        );
    }

    renderSteps(index, steps){
        return Array(steps).fill().map((_, step) => {
            return (
                <View key={step} style={styles.stepContainer}>
                    {step > 0 ? <View style={[styles.stepHighlight, index >= step ? styles.visitedStep : {}]} /> : null}
                    <View style={[styles.stepIndicator, index >= step ? styles.visitedStep : {}]} />
                    {step !== (steps - 1) ? <View style={[styles.stepHighlight, index >= step ? styles.visitedStep : {}]} /> : null}
                </View>  
            );
        });
    }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: deviceWidth/35,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  stepHighlight: {
    borderColor: '#BCBCBC',
    borderWidth: 1,
    width: deviceWidth/15,
    height: 1
  },
  stepIndicator: {
    backgroundColor: '#BCBCBC',
    borderRadius: deviceWidth/50,
    width: deviceWidth/30,
    height: deviceWidth/30
  },
  visitedStep: {
    borderColor: '#02ADB5',
    backgroundColor: '#02ADB5' 
  }
});

export { StepIndicator };