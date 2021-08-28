import React from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import Header from "../Header/Header";
import Pic from "../../assets/payment.jpg";

const Payment = ({ navigation }) => {
    const { width } = Dimensions.get("window")
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <Header navigation={navigation} component="Options" />
            <Text style={{
                fontWeight: "bold",
                fontSize: 22,
                paddingVertical: 25,
                paddingHorizontal: 25
            }}>Payment Method</Text>
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <Image style={{
                    borderRadius: 15,
                }} source={Pic} />
            </View>
            <View style={{ flex: 1, position: "relative" }}>
                <TouchableOpacity onPress={() => navigation.navigate("Congrats")} style={{ position: "absolute", width: width, bottom: 30 }}>
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
                    >Finish Purchase
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Payment
