import React, { useState, useContext, useEffect} from 'react';
import { View, ScrollView, StyleSheet } from "react-native";
import Header from '../Header/Header';
import { SearchBar } from "react-native-elements";
import Carousel from './Carousel';
import MostPopular from './MostPopular';
import axios from 'axios'
import { GlobalContext } from '../../context/Context';

const Discover = ({ navigation }) => {
    const [search, serSearch] = useState("");
    const [productData, setProductData] = useState([])
    const updateSearch = (search) => serSearch(search);
    // const { setSearch}=useContext(GlobalContext)
    useEffect(() => {
        makeGetRequest()
    }, [])
    
// setSearch(search)
async function makeGetRequest() {

    let res = await axios.get(`http://137.184.102.144:8000/api/product/getAllProducts`)
    setProductData(res.data)
    console.log(res.data)
}
const filterProducts = productData.filter(item => {
    return item.name.toLowerCase().includes(search.toLowerCase());
  })
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <Header navigation={navigation} component="Discover" />
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
                <Carousel />
                <MostPopular navigation={navigation} productData={filterProducts} Heading="Most Popular" />
                <View style={{ marginTop: 15 }}>
                    <MostPopular navigation={navigation} productData={productData} Heading="Best Deals"  />
                </View>
            </ScrollView>
        </View>
    )
}

export default Discover;

const styles = StyleSheet.create({
    mainView: {
        paddingHorizontal: 15,
        marginTop: 15,
    },
})