import React, {useContext} from 'react'
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
import image from '../../assets/SliderImage/3.jpg'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {GlobalContext} from '../../context/Context'
import axios from 'axios'
const ProductDetail = ({navigation}) => {
  const {productDetail} = useContext(GlobalContext)
  console.log('productDetail 1111 ', productDetail)
  const {width} = Dimensions.get('window')
  // const { productID } = route.params
  //     /api/order/create

  async function PostOrderByUser () {
    let sendData = {
      owner: productDetail.owner,
      user: '612241b0a3632100162be202',
      product: productDetail._id,
      location: {
        longitude: '31.4504',
        latitude: '73.1350',
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
    console.log('fetschdata', res.data)
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header navigation={navigation} component='Pizza Margherita' />
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
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              {productDetail.name}
            </Text>
            <Text style={{fontSize: 20, color: '#bad759', fontWeight: 'bold'}}>
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
                <Text style={{color: '#777'}}>4.9</Text>
              </View>
              <Text style={{color: '#777'}}>Rating</Text>
            </View>
            <View>
              <Text style={{color: '#777'}}>2356</Text>
              <Text style={{color: '#777'}}>Reviews</Text>
            </View>
            <View>
              <Text style={{color: '#777'}}>6.4k</Text>
              <Text style={{color: '#777'}}>Orders</Text>
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
