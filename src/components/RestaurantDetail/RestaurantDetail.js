import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, TextInputFocusEventData } from "react-native";
import Header from '../Header/Header';
import { SearchBar } from "react-native-elements";
import MostPopular from '../Discover/MostPopular';
import { GlobalContext } from "../../context/Context";
import axios from 'axios'
const RestaurantDetail = ({ navigation, route}) => {
    const [search, serSearch] = useState("");
    const [productData, setProductData] = useState([])
    const updateSearch = (search) => serSearch(search);
    // const { vendorData } = useContext(GlobalContext)
    const { id, shopName } = route.params
    useEffect(() => {
        VendorByProduct()
    }, [])
    console.log("id", id)
    
    async function VendorByProduct() {

        let res = await axios.post(`https://foodappnative.herokuapp.com/api/product/getByOwner`, { owner : id })
        setProductData(res.data)

        console.log("fetschdata",res.data)
    }
  
    

 const filterProducts = productData.filter(item => {
        return item.name.toLowerCase().includes(search.toLowerCase());
      })
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <Header navigation={navigation} component={shopName} />
            <ScrollView>
                <View style={styles.mainView} >
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
                    <MostPopular navigation={navigation} resDetail={true} productData={filterProducts}  Heading="Available Products" />
                </View>
             {/* <View>
                 <Text>{productData.map((item, id)=>(<View key={id}>
<Text>{item.review}</Text>
                 </View>))}</Text>
             </View> */}
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