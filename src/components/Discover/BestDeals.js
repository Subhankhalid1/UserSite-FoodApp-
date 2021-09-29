import React, { useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "react-native-elements";
import { array } from 'yup';

import { GlobalContext } from "../../context/Context";
const BestDeals = ({ Heading, navigation, resDetail, productData }) => {
    const {  setProductDetail } = useContext(GlobalContext);
   const[discount, setDiscount]=useState([])
//console.log(productData)

// productData.forEach(element => {
   
//     if(element.discount){
//      console.log("filteres",element)
//         arrays.push(element)
//     }

// });

    const navigationFunc = (item) => {
    
            setProductDetail(item)
            return navigation.navigate("ProdDetail");
        
    }
   

    const _renderItems = ({ item, index }) => {
        
        
        return (<>{
            item.discount?<>


<TouchableOpacity onPress={(e)=>navigationFunc(item)} style={styles.view}>
                {/* {console.warn(item.productPic)} */}
                <Image key={index} source={{ uri: `http://137.184.102.144:8000/${item.productPic}` }} style={styles.image} />
                        <View>   
                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 5 }}>
                                    <Text style={{ color: "#777" }}>{item.name}</Text>
                                    <Text style={{ color: "red" }}>${item.price}</Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent:'space-around', marginTop: 5 }}>
                                 
                                <Text style={{ color: "#777" }}>Off</Text>
                                <Text style={{ color: "#bad759" }}>{item.discount/item.price*100}%</Text>

                                </View>
                        </View>
                
            </TouchableOpacity>

            </>:null
        }
            
        </>)
    }
    return <>
        <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "#777" }}>{Heading}</Text>
        </View>
        
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 2 }}
            data={productData}
            renderItem={_renderItems}
            keyExtractor={(item, index) => index.toString()}
        />
        
    </>
}

export default BestDeals;

const styles = StyleSheet.create({
    view: {
        height: 180,
        width: 120,
        marginHorizontal: 10,
        borderRadius: 15,
    },
    image: {
        height: 110,
        width: 120,
        borderRadius: 15,
    }
})






