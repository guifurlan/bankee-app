import React from  'react';
import { View } from 'react-native';
import { NavigationTab } from './common';

import { connect } from 'react-redux';
import * as actions from '../actions';

class NavigationTabItem extends React.Component {
    render() { 
        const { label, iconSymbol, focused } = this.props;

        return (
            <View style={{alignSelf: 'center'}}>
                <NavigationTab title={label} icon={iconSymbol} selected={focused} />
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        selected: ownProps.index === state.selectedTab
    }
}

export default connect(mapStateToProps, actions)(NavigationTabItem);