import React from  'react';
import { KeyboardAvoidingView, ScrollView, View, Text, TouchableWithoutFeedback, ActivityIndicator, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { textStyle, iconStyle } from '../style';
import { registerFormChanged, registerEdit, saveUserData, saveUserDataCancel } from '../actions';
import { InlineEditInput } from './common';
import { formatCurrency, parseIntString, fillLeftZeroes } from '../utils';

class Profile extends React.Component {
    editFinantialData(){
        this.props.registerEdit(this.props.userData);
    }

    saveFinantialData(){
        this.props.saveUserData(this.props.register);
    }

    renderInlineFormActions({ isEditing, loading } = this.props){
        if(loading){
            return (
                <ActivityIndicator />
            )
        }
        else if(isEditing){
            return (
                <TouchableWithoutFeedback onPress={this.saveFinantialData.bind(this)}>
                    <View style={{paddingVertical: 5, paddingHorizontal: 10}}>
                        <Text style={[iconStyle, {color: '#02ADB5', fontSize: 14}]}>
                            &#xf0c7;
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            )
        }
        else{
            return (
                <TouchableWithoutFeedback onPress={this.editFinantialData.bind(this)}>
                    <View style={{paddingVertical: 5, paddingHorizontal: 10}}>
                        <Text style={[iconStyle, {color: '#02ADB5', fontSize: 14}]}>
                            &#xf304;
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            )
        }
    }

    render({ userData, register, isEditing } = this.props) {
        return (
            
            <ScrollView style={styles.containerStyle}>
                <KeyboardAvoidingView style={{flex: 1}} behavior='position'>
                    <View style={styles.profileHeader}>
                        <Text style={[textStyle, {fontSize: 30}]}>{this.props.userData.username}</Text>
                    </View>
                    <View style={styles.sectionStyle}>
                        <View style={styles.sectionHeader}>
                            <Text style={[textStyle, {color: '#161616'}]}>Dados Cadastrados</Text>
                        </View>
                        <View style={styles.sectionBody}>
                            <View style={styles.sectionRow}>
                                <Text style={styles.sectionText}>E-mail</Text>
                                <Text style={styles.sectionValue}>{userData.email}</Text>
                            </View>
                            {/* TODO: implement change password just in case of firebase account
                            <View style={styles.separator}></View>
                            <View style={styles.sectionRow}>
                                <Text style={styles.sectionText}>Senha</Text>
                                <Text style={[styles.sectionValue, {fontWeight: 'bold', textDecorationLine: 'underline'}]}>Alterar senha</Text>
                            </View>
                            */}
                        </View>
                    </View>
                    <View style={styles.sectionStyle}>
                        <View style={styles.sectionHeader}>
                            <Text style={[textStyle, {color: '#161616'}]}>Dados Financeiros</Text>
                            {this.renderInlineFormActions()}
                        </View>
                        <View style={styles.sectionBody}>
                            <View style={styles.sectionRow}>
                                <Text style={styles.sectionText}>Renda mensal</Text>
                                <InlineEditInput 
                                    editValue={register.income} 
                                    labelValue={userData.income} 
                                    isEditing={isEditing}
                                    inputProps={{keyboardType: 'numeric'}}
                                    labelStyleProps={[textStyle, {color: '#161616'}]}
                                    onInputChange={(input) => this.props.registerFormChanged('income', input, true)} />
                            </View>
                            <View style={styles.separator}></View>
                            <View style={styles.sectionRow}>
                                <Text style={styles.sectionText}>Fundo de garantia</Text>
                                <InlineEditInput 
                                    editValue={register.funds} 
                                    labelValue={userData.funds} 
                                    isEditing={isEditing}
                                    inputProps={{keyboardType: 'numeric'}}
                                    labelStyleProps={[textStyle, {color: '#161616'}]}
                                    onInputChange={(input) => this.props.registerFormChanged('funds', input, true)} />
                            </View>
                            <View style={styles.separator}></View>
                            <View style={styles.sectionRow}>
                                <Text style={styles.sectionText}>Total de dívidas</Text>
                                <InlineEditInput 
                                    editValue={register.debt} 
                                    labelValue={userData.debt} 
                                    isEditing={isEditing}
                                    inputProps={{keyboardType: 'numeric'}}
                                    labelStyleProps={[textStyle, {color: '#161616'}]}
                                    onInputChange={(input) => this.props.registerFormChanged('debt', input, true)} />
                            </View>
                            <View style={styles.separator} />
                            <View style={styles.sectionRow}>
                                <Text style={styles.sectionText}>Juros sobre as dívidas</Text>
                                <InlineEditInput 
                                    editValue={register.interest} 
                                    labelValue={userData.interest} 
                                    isEditing={isEditing}
                                    inputProps={{keyboardType: 'numeric'}}
                                    labelStyleProps={[textStyle, {color: '#161616'}]}
                                    onInputChange={(input) => this.props.registerFormChanged('interest', input, true)} />
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        backgroundColor:  '#F1F1F1'
    },
    profileHeader: {
        minHeight: 80,
        backgroundColor: '#02ADB5',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 100,
        marginBottom: 15
    },
    sectionStyle: {
        backgroundColor: 'white',
        borderRadius: 5,
        margin: 15,
        marginTop: 0
    },
    sectionHeader: {
        marginBottom: 5,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    sectionBody: {
        paddingLeft: 10,
        width: '100%'
    },
    sectionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        width: '100%'
    },
    sectionText: {
        ...textStyle,
        color: '#BCBCBC'
    },
    sectionValue: {
        ...textStyle,
        color: '#161616'
    },
    separator: {
        paddingVertical: 2,
        borderBottomWidth: 1,
        borderBottomColor: '#BCBCBC',
        height: 1,
        width: '100%',
        marginLeft: 30
    }
};

const mapStateToProps = (state) => {

    const income = formatCurrency(parseIntString(state.register.income));
    const debt = formatCurrency(parseIntString(state.register.debt));
    const funds = formatCurrency(parseIntString(state.register.funds));
    const interest = parseIntString(fillLeftZeroes(state.register.interest, 1)) + '%';

    return {
        loading: state.profile.loading, 
        isEditing: state.profile.isEditing,
        register: {
            ...state.register,
            income,
            debt,
            funds,
            interest
        },
        profile: {
            ...state.profile
        },
        userData: {
            ...state.userData,
        }
    };
}

export default connect(mapStateToProps, { registerFormChanged, registerEdit, saveUserData })(Profile);