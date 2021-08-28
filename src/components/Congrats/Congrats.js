import React from 'react';
import { View, Image, TouchableOpacity, Text, Dimensions } from 'react-native';
import Pic from "../../assets/track.png";
import Header from "../Header/Header";

const Congrats = ({ navigation }) => {
    const { width } = Dimensions.get("window");
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <Header navigation={navigation} component="Congratulations" />
            <View style={{ flex: 1, justifyContent: "space-evenly" }}>
                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                    <Image source={Pic} style={{ width: 250 }} />
                </View>
                <View>
                    <Text style={{ textAlign: "center", fontSize: 30, color: "#bad759" }}>Congratulations!</Text>
                    <Text style={{ textAlign: "center", fontSize: 17, marginTop: 10 }}>Your order is placed and it's</Text>
                    <Text style={{ textAlign: "center", fontSize: 17 }}>on it's way to you</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate("Tracker")}>
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
                        >Track Order
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                        <Text style={{
                            textAlign: "center",
                            paddingVertical: 10,
                            fontSize: 18,
                            color: "#bad759",
                            fontWeight: "bold",
                            borderRadius: 15,
                            marginHorizontal: 15,
                            borderWidth: 1,
                            borderColor: "#bad759",
                            marginTop: 15
                        }}
                        >Back Home
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Congrats;