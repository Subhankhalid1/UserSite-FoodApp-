import React, { useState, useContext } from 'react'
import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,

} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'
import { GlobalContext } from "../../context/Context";
const { width } = Dimensions.get('window')

const Items = ({ navigation }) => {
  const [selectedId, setSelectedId] = useState(null)
  const { vendorList, setVendorDetail } = useContext(GlobalContext)
  console.log("vendorlist: ", vendorList)
  const navigationFunc = (item) => {
    // console.log("helo",item.shopName)
    navigation.navigate("ResDetail", { id: item._id, shopName: item.shopName });
    //  , {id:item.owner}
    // setVendorDetail(item)
  }


  // { uri: `https://foodappnative.herokuapp.com/${item.productPic}` }
  const _renderItems = ({ item, index }) => {
    console.log("helo", item.shopName)
    return (<>
      {
        !item ? (
          <Text>Loading..</Text>
        ) : (<TouchableOpacity
          onPress={(e) => navigationFunc(item)}
          key={index}
          style={styles.mainView}>
          <Image source={{ uri: 'https://foodappnative.herokuapp.com/uploads/products/download.jpg' }} style={styles.image} />
          <View style={styles.detailView}>
            <View>
              <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{item.name}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name='star-rate' color='#bad759' style={{ marginRight: 2 }} />
                <Text style={styles.textMuted}>{item.rating}</Text>
              </View>
              <Text style={styles.textMuted}>Rating</Text>
              <Text style={styles.textMuted}>{item.updatedAt}</Text>
            </View>
            <View>
              <View>
                {/* <Text style={{fontSize: 17, color: '#777'}}>distance</Text> */}
                <Text style={styles.textMuted}>reviews</Text>
                <Text style={styles.textMuted}>Review</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>)
      }

    </>)
  }
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      style={{ marginTop: 15, paddingHorizontal: 10 }}
      data={vendorList}
      renderItem={_renderItems}
      keyExtractor={item => item.id}
      extraData={selectedId}
    />
  )
}

export default Items

const styles = StyleSheet.create({
  mainView: {
    width,
    backgroundColor: '#f8f8f8',
    marginBottom: 15,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    flexDirection: 'row',
  },
  image: {
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    width: 100,
    height: 100,
  },
  detailView: {
    padding: 10,
    flexDirection: 'row',
    flexGrow: 0.83,
    justifyContent: 'space-between',
  },
  textMuted: {
    color: '#777',
  },
})
