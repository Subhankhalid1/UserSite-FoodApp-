import React, {useContext, useEffect, useState} from 'react'
import {
  View,
  ScrollView,
  StyleSheet,
  TextInputFocusEventData,
  Text,
  ActivityIndicator
} from 'react-native'
import Header from '../Header/Header'
import {SearchBar} from 'react-native-elements'
import MostPopular from '../Discover/MostPopular'
import {GlobalContext} from '../../context/Context'
import axios from 'axios'
const RestaurantDetail = ({navigation, route}) => {
  const [search, serSearch] = useState('')
  const [ActivityIndicatorStatus, setActivityIndicator] = useState(false);
  const [productData, setProductData] = useState([])
  const updateSearch = search => serSearch(search)
  // const { vendorData } = useContext(GlobalContext)
  const {id, shopName} = route.params
  useEffect(() => {
    VendorByProduct()
  }, [])
  console.log('id', shopName)

  async function VendorByProduct () {
    setActivityIndicator(true)
    let res = await axios.post(
      `http://137.184.102.144:8000/api/product/getByOwner`,
      {owner: id},
    )
    setActivityIndicator(false)
    setProductData(res.data)

    console.log('fetschdata', res.data)
  }

  const filterProducts = productData.filter(item => {
    return item.name.toLowerCase().includes(search.toLowerCase())
  })
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header navigation={navigation} component={shopName} />
      <ScrollView>
        <View style={styles.mainView}>
          <SearchBar
            placeholder='Search'
            onChangeText={updateSearch}
            value={search}
            clearIcon={true}
            showLoading={true}
            containerStyle={{
              backgroundColor: 'white',
              borderRadius: 50,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,
              elevation: 2,
              paddingVertical: 0,
            }}
            inputContainerStyle={{backgroundColor: 'white', borderRadius: 50}}
            leftIconContainerStyle={{borderColor: 'white'}}
            lightTheme={true}
          />
        </View>
        {
          ActivityIndicatorStatus == true ? (
            <View
              style={{
               alignItems:'center',
                justifyContent: 'center',
                marginTop:200
           
              }}>
              <ActivityIndicator
                style={{alignSelf: 'center'}}
                size="large"
                color={"#bad759"}
              />
            </View>
          ) : (<>
        <View style={{marginTop: 15}}>
          <MostPopular
            navigation={navigation}
            resDetail={true}
            productData={filterProducts}
            Heading='Available Products'
          />
        </View>

        <View
          style={{
            display: 'flex',
            marginTop: 30,
            backgroundColor: 'white',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 30,
              fontFamily: 'bold',
              color:'#777'
             
            }}>
            Customer reviews
          </Text>
          <View>
            {productData.map((item, id) => (
              <View
                key={id}
                style={{
                  // backgroundColor: '#bad759',
                 // height: 50,
                  // borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  margin:10,
   
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                {console.log('reviews', item?.reviews[0]?.description)}
                <Text style={{color: '#777'}}>
                  {' '}
                  {item?.reviews[0]?.description}
                </Text>
              </View>
            ))}
          </View>
        </View>
         </> )}
      </ScrollView>
    </View>
  )
}

export default RestaurantDetail

const styles = StyleSheet.create({
  mainView: {
    paddingHorizontal: 15,
    marginTop: 15,
  },
})
