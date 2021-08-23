import React from  'react';
import { connect } from 'react-redux';
import { View, Text, TouchableHighlight, TouchableOpacity } from 'react-native';

import { textStyle } from '../../style';
import { Dialog } from '../common';
import { deleteCard } from '../../actions';

class Card extends React.Component {
    state = { actionsDialogVisible: false, highlighted: false }

    showCardOptions(){
        this.setState({ ...this.state, actionsDialogVisible: true, highlighted: true });
    }

    hideCardOptions(){
        this.setState({ ...this.state, actionsDialogVisible: false, highlighted: false })
    }

    deleteCard(){
        this.props.deleteCard(this.props.id);
        this.hideCardOptions();
    }

    render() {
        return (
            <View>
                <TouchableHighlight delayLongPress={500} style={styles.cardContainerStyle} 
                    onLongPress={this.showCardOptions.bind(this)}
                    activeOpacity={0.9}>
                    <View style={[{padding: 5, borderRadius: 5, backgroundColor: this.props.color || '#F2AE17' },
                                this.state.highlighted ? styles.highlightedView : {}]}>
                        <View style={styles.cardHeaderStyle}>
                            <Text style={[textStyle, this.props.titleStyle]}>{this.props.title}</Text>
                        </View>
                        <View style={styles.cardBodyStyle}>
                            {this.props.children}
                        </View>
                    </View>
                </TouchableHighlight>
                <Dialog title="Ações do card" visible={this.state.actionsDialogVisible} onDismiss={this.hideCardOptions.bind(this)} >
                    <TouchableOpacity onPress={this.deleteCard.bind(this)}>
                        <View style={styles.modalOptionStyle}>
                            <Text>Excluir</Text>
                        </View>
                    </TouchableOpacity>
                </Dialog>
            </View>
        );
    }
}

const styles = {
    cardContainerStyle: {
        backgroundColor: '#000',
        marginBottom: 10,
        borderRadius: 5,
        minHeight: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5
    },
    highlightedView: {
        opacity: 0.9
    },
    modalOptionStyle: {
        borderBottomWidth: 1,
        borderColor: '#f1f1f1',
        paddingVertical: 10
    }
};

export default connect(null, { deleteCard })(Card);