import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FontIcon from "react-native-vector-icons/FontAwesome";

const Header = ({ component, navigation }) => {
    return (
        <View style={styles.headerMain}>
            {
                (component === "Home" || component === "Discover" || component === "Popular" || component === "Profile") ?
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <FontIcon color="white" name='bars' size={25} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <FontIcon color="white" name="arrow-left" size={25} />
                    </TouchableOpacity>

            }
            <Text style={{ color: "white", fontSize: 20 }}>{component}</Text>
            <FontIcon name="shopping-cart" color="white" size={25} />
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    headerMain: {
        height: 50,
        backgroundColor: "#bad759",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20
    }
})