import React, {useContext, useState, useEffect} from 'react'
import {
  Image,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import Header from '../Header/Header'
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {GlobalContext} from '../../context/Context'
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
const ProductDetail = ({navigation}) => {
  const {productDetail} = useContext(GlobalContext)
  console.log('productDetail 1111 ', productDetail)
  const {width} = Dimensions.get('window')
  // const { productID } = route.params
  //     /api/order/create
const [latitude, setlatitude]=useState()
const [profileData, setProfileData] = useState()
const [longitude, setlongitude] = useState()
useEffect(()=>{
  Geolocation.getCurrentPosition(info => {
    setlatitude(info.coords.latitude)
    setlongitude(info.coords.longitude)
   } )
   profile()
  },[])
  const profile = async () => {
    const jsonValue = await AsyncStorage.getItem('user')
    // jsonValue != null ? JSON.parse(jsonValue) : null
    const result = JSON.parse(jsonValue)
    console.log('user wale', result)

    setProfileData(result)
  }
  async function PostOrderByUser () {
  

    let sendData = {
      owner: productDetail.owner,
      user: profileData._id,
      product: productDetail._id,
      location: {
        longitude: longitude,
        latitude: latitude,
      },
    }

    //stored data aysnce storage and after payment data sent to the vendor

    let res = await axios.post(
      `http://137.184.102.144:8000/api/order/create`,
      sendData,
    )
    // setProductData(res.data)
    if (res.data) {
      navigation.navigate('PlacedOrder')
    }
    console.log('Create Order By User', res.data)
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header navigation={navigation}  style={{color:'white'}} component={productDetail.name} />
      {!productDetail ? (
        <ActivityIndicator />
      ) : (
        <ScrollView>
          <Image source={{ uri: `http://137.184.102.144:8000/${productDetail.productPic}` }} style={{width, height: 225}} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 15,
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold',color: '#bad759'}}>
              {productDetail.name}
            </Text>
            <Text style={{fontSize: 20, color: '#bad759', fontWeight: 'bold'}}>
            {productDetail.discount?productDetail.discount/productDetail.price*100:0}% Off
            </Text>
          </View>
          <View style={{paddingHorizontal: 15}}>
            <Text style={{color: '#777', fontSize: 14,fontWeight: 'bold'}}>
              ${productDetail.price}
            </Text>
          </View>
          <View style={{paddingHorizontal: 15}}>
            <Text style={{color: '#777', fontSize: 14}}>
              {productDetail.detail}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 15,
              alignItems: 'center',
            }}>
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  name='star-rate'
                  color='#bad759'
                  style={{marginRight: 2}}
                />
                <Text style={{color: '#bad759'}}>{productDetail.reviews.rating}</Text>
              </View>
              <Text style={{color: '#777'}}>Rating</Text>
            </View>
            <View>
              <Text style={{color: '#bad759'}}>{productDetail.reviews.length}</Text>
              <Text style={{color: '#777'}}>Reviews</Text>
            </View>
            <View>
              <Text style={{color: '#777'}}>After Discount</Text>
              <Text style={{color: 'red'}}>${productDetail.discount?productDetail.price-productDetail.discount:productDetail.price}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={PostOrderByUser}>
            <Text
              style={{
                textAlign: 'center',
                paddingVertical: 10,
                fontSize: 18,
                backgroundColor: '#bad759',
                color: 'white',
                fontWeight: 'bold',
                borderRadius: 15,
                marginHorizontal: 15,
                marginVertical: 15,
              }}>
              Place Order
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Ratings', {productID: productDetail._id, productDetail:productDetail})
            }>
            <Text
              style={{
                textAlign: 'center',
                paddingVertical: 10,
                fontSize: 18,
                color: '#bad759',
                fontWeight: 'bold',
                borderRadius: 15,
                marginHorizontal: 15,
                borderWidth: 1,
                borderColor: '#bad759',
                marginBottom: 10,
              }}>
              Rate Product
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  )
}

export default ProductDetail
