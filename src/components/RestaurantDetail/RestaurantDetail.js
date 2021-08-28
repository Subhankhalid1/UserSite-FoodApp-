import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from "react-native";
import Header from '../Header/Header';
import { SearchBar } from "react-native-elements";
import MostPopular from '../Discover/MostPopular';
import { GlobalContext } from "../../context/Context";
import axios from 'axios'
const RestaurantDetail = ({ navigation, route}) => {
    const [search, serSearch] = useState("");
    const [productData, setProductData] = useState([])
    const updateSearch = (search) => serSearch(search);
    const { vendorData } = useContext(GlobalContext)
    // const { id } = route.params
    // useEffect(() => {
    //     GetVendorByProduct()
    // }, [])
    // console.log("id", id)
    
    // async function GetVendorByProduct() {

    //     let res = await axios.get(`https://foodappnative.herokuapp.com/api/product/getByOwner`, { owner : "612534601ba0470016df52e" })
    //     // setProductData(res.data)

    //     console.log("fetschdata",res)
    // }
    // console.log("productData",productData)
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <Header navigation={navigation} component="John's Place" />
            <ScrollView>
                <View style={styles.mainView}>
                    <SearchBar
                        placeholder="Search"
                        onChangeText={updateSearch}
                        value={search}
                        clearIcon={true}
                        showLoading={true}
                        containerStyle={{
                            backgroundColor: "white", borderRadius: 50,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.20,
                            shadowRadius: 1.41,
                            elevation: 2,
                            paddingVertical: 0
                        }}
                        inputContainerStyle={{ backgroundColor: "white", borderRadius: 50 }}
                        leftIconContainerStyle={{ borderColor: "white" }}
                        lightTheme={true}
                    />
                </View>
                <View style={{ marginTop: 15 }}>
                    <MostPopular navigation={navigation} resDetail={true}  Heading="Top Offers" />
                </View>
                <View style={{ marginTop: 15 }}>
                    <MostPopular navigation={navigation} resDetail={true}  Heading="Most Popular" />
                </View>
            </ScrollView>
        </View>
    )
}

export default RestaurantDetail;

const styles = StyleSheet.create({
    mainView: {
        paddingHorizontal: 15,
        marginTop: 15,
    },
})