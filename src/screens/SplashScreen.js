import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from "react-native";
import Logo from "../assets/logo.jpeg";
import * as Animatable from 'react-native-animatable';

const SplashScreen = ({ navigation }) => {

    useEffect(() => {
        setTimeout(() => navigation.navigate("One"), 2500);
    }, [])

    return (
        <View style={styles.splash}>
            <Animatable.Image animation="zoomIn" duration={1000} style={{ width: 250, height: 250 }} source={Logo} />
        </View>
    )
}

export default SplashScreen;

const styles = StyleSheet.create({
    splash: {
        flex: 1,
        backgroundColor: "#bad759",
        justifyContent: "center",
        alignItems: "center",
    },
})