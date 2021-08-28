import React from 'react';
import { Image, Text, View, TouchableOpacity } from "react-native";
import Pic from "../../assets/placed.png";
import Header from "../Header/Header";

const Placed = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <Header navigation={navigation} component="Options" />
            <View style={{
                justifyContent: "space-evenly",
                flex: 1
            }}>

                <View style={{
                    flexDirection: "row",
                    alignContent: "center",
                    justifyContent: "center",
                }}>
                    <Image style={{ borderWidth: 1 }} source={Pic} />
                </View>
                <View>
                    <Text style={{ color: "#bad759", fontSize: 30, fontWeight: "bold", textAlign: "center" }}>Order Placed</Text>
                    <Text style={{ color: "black", fontSize: 18, textAlign: "center" }}>Would You Like Some</Text>
                    <Text style={{ color: "black", fontSize: 18, textAlign: "center" }}>Of These As Well?</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("Payment")}>
                    <Text style={{
                        textAlign: "center",
                        paddingVertical: 10,
                        fontSize: 18,
                        backgroundColor: "#bad759",
                        color: "white",
                        fontWeight: "bold",
                        borderRadius: 15,
                        marginHorizontal: 15,
                    }}
                    >To Checkout
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}   

export default Placed;