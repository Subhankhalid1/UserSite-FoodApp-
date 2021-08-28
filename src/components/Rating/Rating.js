import React from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import Pic from "../../assets/SliderImage/3.jpg";
import RatingItem from './RatingItem';

const Rating = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: "white", justifyContent: "space-evenly" }}>
            <Text style={{
                color: "#bad759",
                fontSize: 25,
                fontWeight: "bold",
                textAlign: "center"
            }}>How Was Your Food?</Text>

            <View style={{ marginHorizontal: 15 }}>
                <Image style={{
                    width: "100%",
                    height: 235,
                    borderRadius: 15
                }} source={Pic} />
            </View>

            <Text style={{
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
                color: "black"
            }}>Pizza Margherita</Text>
            <RatingItem />

            <TextInput placeholder="Additional Comments" style={{
                borderWidth: 1,
                marginHorizontal: 15,
                borderRadius: 10,
                paddingBottom: 85,
                paddingHorizontal: 10,
                borderColor: "#777"
            }} />

            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
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
                >Rate It
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Rating;