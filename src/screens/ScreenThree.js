import React from 'react';
import Capture from "../assets/Capture.png";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Animatable from 'react-native-animatable';

const ScreenThree = ({ navigation }) => {
    return (
        <Animatable.View animation="fadeInRight" duration={500} style={styles.mainView}>
            <View style={{ flex: 1.5, justifyContent: "flex-end", alignContent: "center" }}>
                <Image style={{ width: 360, height: 300 }} source={Capture} />
            </View>
            <View style={styles.radioView}>
                <View>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>So You Can Enjoy</Text>
                </View>
                <View style={styles.radioButtonsMain}>
                    <View style={styles.radioBox}></View>
                    <View style={styles.radioBox}></View>
                    <View style={[styles.radioBox, styles.active]}></View>
                </View>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                        <Text style={styles.nextBtn}>Next</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                        <Text style={{ fontSize: 18, color: "#999999" }}>Skip</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Animatable.View>
    )
}

export default ScreenThree;

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: "white",
        flex: 1
    },
    radioBox: {
        height: 13,
        width: 13,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#999999',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,
        marginRight: 5
    },
    radioView: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    radioButtonsMain: {
        flexDirection: "row",
    },
    active: {
        backgroundColor: "#bad759",
        borderColor: '#bad759',
    },
    nextBtn: {
        backgroundColor: "#bad759",
        color: "white",
        fontSize: 18,
        paddingLeft: 130,
        paddingRight: 130,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 50
    }
})