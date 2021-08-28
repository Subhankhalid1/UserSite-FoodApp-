import React from 'react';
import { View, Text } from "react-native";
import Header from '../Header/Header';

const Setting = ({ navigation }) => {
    return (
        <View>
            <Header navigation={navigation} component="Settings" />
            <Text>Settings Page</Text>
        </View>
    )
}

export default Setting;