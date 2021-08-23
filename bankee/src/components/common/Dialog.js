import React from 'react';
import { View, Text, Modal, TouchableWithoutFeedback } from 'react-native';

import { textStyle, iconStyle } from '../../style';

const Dialog = ({ title, visible, children, onDismiss }) => {
    const {
        modalStyle,
        modalHeaderStyle,
        modalBodyStyle,
        modalContainerStyle
    } = styles;

    return (
        <Modal transparent visible={visible} animationType="fade" onRequestClose={() => {}}>
            <View style={modalStyle}>
                <View style={modalContainerStyle}>
                    <View style={modalHeaderStyle}>
                        <Text style={[textStyle, {color: '#BCBCBC', padding: 15}]}>{title}</Text>
                        <TouchableWithoutFeedback onPress={onDismiss}>
                            <View style={{padding: 15}}>
                                <Text style={[iconStyle, {color: '#BCBCBC'}]}>&#xf00d;</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={modalBodyStyle}>
                        {children}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = {
    modalHeaderStyle: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    modalBodyStyle: {
        padding: 20,
        paddingTop: 0,
    },
    modalStyle: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalContainerStyle: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 5
    }
}

export { Dialog };