import React from 'react';

import { KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';

const KeyboardAvoidingWrapper = ({children, backgroundColor}) => {
    return (
        <KeyboardAvoidingView style={{flex: 1}}>
            <ScrollView style={{backgroundColor: backgroundColor}}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    {children}
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default KeyboardAvoidingWrapper;