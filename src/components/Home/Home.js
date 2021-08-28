import React, { useEffect, useState } from 'react';
import { Text, Image, View, StyleSheet, FlatList, TouchableOpacity, ScrollView, PermissionsAndroid } from "react-native";
import Header from "../Header/Header";
import * as Animatable from 'react-native-animatable';
import Logo from "../../assets/innerLogo.jpeg";
import Icon from "react-native-vector-icons/FontAwesome5";
import Geolocation from '@react-native-community/geolocation';
import MapView from 'react-native-maps';

const Home = ({ navigation }) => {
    const [region, setRegion] = useState(null);
    const _data = [{ name: "Pasta" }, { name: "Pizza" }, { name: "Burger" }, { name: "Steak" }, { name: "Sushi" }, { name: "Salad" }, { name: "Cake" }, { name: "Donut" }]
    const _numColumns = 2;
    const _renderItems = ({ item, index }) => {
        return <TouchableOpacity key={index} style={styles.products}>
            <Icon size={35} color="#bad759" name="pizza-slice" />
            <Text style={{ fontWeight: "bold", color: "#777", marginTop: 10 }}>{item.name}</Text>
        </TouchableOpacity>
    }

    useEffect(() => {
        requestLocationPermission();
    }, [])

    const get_current_location = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                var lat = parseFloat(position.coords.latitude);
                var long = parseFloat(position.coords.longitude);
                var initialRegion = {
                    latitude: lat,
                    longitude: long,
                    // latitudeDelta: LATITUDE_DELTA,
                    // longitudeDelta: LONGITUDE_DELTA,
                };
                setRegion(initialRegion)
                // this.setState({ region: initialRegion, currentLocationViewer: true });
            },
            (error) => alert(JSON.stringify(error)),
            { enableHighAccuracy: false, timeout: 20000 },
        );
    }

    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Infarmer App Location Permission',
                    message: 'Infarmer App needs access to your device location.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the location');
                get_current_location();
            } else {
                console.log('location permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    return (
        <Animatable.View style={{ flex: 1, backgroundColor: "#f7f7f7" }} animation="fadeIn" duration={500}>
            <Header navigation={navigation} component="Home" />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.imageMain}>
                    <Image style={styles.image} source={Logo} />
                </View>
                <View style={styles.textView}>
                    <Text style={{ fontSize: 25, fontWeight: "bold", color: "#777" }}>What Is Your</Text>
                    <Text style={{ fontSize: 25, fontWeight: "bold", color: "#777" }}>Favourite Food?</Text>
                </View>
                <FlatList
                    style={{ flex: 1, padding: 20 }}
                    data={_data}
                    renderItem={_renderItems}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={_numColumns}
                />
            </ScrollView>
            <MapView
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
        </Animatable.View>
    )
}

export default Home;

const styles = StyleSheet.create({
    image: {
        width: 80,
        height: 80,
        borderRadius: 50
    },
    imageMain: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 15
    },
    textView: {
        alignItems: "center",
        paddingVertical: 10
    },
    products: {
        fontSize: 20,
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        height: 100,
        margin: 8,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
})