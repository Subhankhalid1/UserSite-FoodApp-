import React, { useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "react-native-elements";
import pic1 from "../../assets/SliderImage/6.jpg";
import pic2 from "../../assets/SliderImage/7.jpg";
import pic3 from "../../assets/SliderImage/8.jpg";
import pic4 from "../../assets/SliderImage/9.jpg";
import pic5 from "../../assets/SliderImage/3.jpg";
import { GlobalContext } from "../../context/Context";
const MostPopular = ({ Heading, navigation, resDetail, }) => {
    const { productData, setProductDetail, search } = useContext(GlobalContext);
console.log(search)
 const filterProducts = productData.filter(item => {
        return item.name.toLowerCase().includes(search.toLowerCase());
      })

    const navigationFunc = (item) => {
       
        if (resDetail === true) {
            setProductDetail(item)
            return navigation.navigate(`ProdDetail`);
        }
        else {
            return navigation.navigate("ResDetail");
        }
    }
   

    const _renderItems = ({ item, index }) => {
        
        return (
            <TouchableOpacity onPress={(e)=>navigationFunc(item)} style={styles.view}>
                {/* {console.warn(item.productPic)} */}
                <Image key={index} source={pic3} style={styles.image} />
                        <View>   
                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 5 }}>
                                    <Text style={{ color: "#777" }}>{item.name}</Text>
                                    <Text style={{ color: "red" }}>${item.price}</Text>
                                </View>
                            
                        </View>
                
            </TouchableOpacity>
        )
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
        {/* {
            filterProducts && filterProducts.map((item, id) => {
                return(<TouchableOpacity onPress={(e)=>navigationFunc(item)} key={id} style={styles.view}>
                    
                    <Image key={index} source={pic3} style={styles.image} />
                            <View>   
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 5 }}>
                                        <Text style={{ color: "#777" }}>{item.name}</Text>
                                        <Text style={{ color: "red" }}>${item.price}</Text>
                                    </View>
                                
                            </View>
                    
                </TouchableOpacity>
                )
            })
        } */}
    </>
}

export default MostPopular;

const styles = StyleSheet.create({
    view: {
        height: 140,
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







// async uploadAccountLogo(accessToken) {
//     let formdata = new FormData();
//     formdata.append('image', image);
//     const options = {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
        
//       },
//     }

//     const response = await this.postRequest(
//       this.baseUrl,
//       `${paths.account.account}/logo/getAccountLogo`,
//        formdata,
//       options
//     )
//     return response
//   }