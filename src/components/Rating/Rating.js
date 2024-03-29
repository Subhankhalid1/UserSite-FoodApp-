import React, {useState, useEffect} from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import Pic from "../../assets/SliderImage/3.jpg";
import RatingItem from './RatingItem';
import axios from 'axios'
import { Rating } from 'react-native-ratings';
import AsyncStorage from '@react-native-community/async-storage';


const Ratings = ({ navigation, route }) => {
    const { productID, productDetail } = route.params
    const [review, setReview] = useState({
  
        description: '',
       
      })
//       const ratingCompleted = (rating) => {
// console.log(rating)
// setReview(review.rating)
//     }
      const handleChange = (name, value) => {
    
        setReview({
          ...review,
         [name] : value,
        })
      }
   
    console.log(productID)
    const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('user')
          console.log("value",value)
          if(value !== null) {
            // value previously stored
          }
        } catch(e) {
          // error reading value
        }
      }
      getData()
    
    const userReview = async (e )=> {
        const sendData={
            productID:productID,
            user:'612241b0a3632100162be202',
            rating:review.rating,
            description:review.description
        }
        let res = await axios.post(`http://137.184.102.144:8000/api/product/review`, sendData)
        setReview(res.data)
        console.log(res.data)

        setReview({
            description: '',
        })
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white", justifyContent: "space-evenly" }}>
            <Text style={{
                color: "#bad759",
                fontSize: 25,
                fontWeight: "bold",
                textAlign: "center"
            }}>How Was Your Food?</Text>

            <View style={{ marginHorizontal: 15 }}>
                <Image style={{
                    width: "100%",
                    height: 235,
                    borderRadius: 15
                }} source={{ uri: `http://137.184.102.144:8000/${productDetail.productPic}` }} />
            </View>

            <Text style={{
                fontSize: 25,
                fontWeight: "bold",
                textAlign: "center",
                color: "#bad759"
            }}>{productDetail.name}</Text>
            <RatingItem />
            {/* <Rating
                type="custom"
                onFinishRating={ratingCompleted}
                ratingColor={"#bad759"}
                startingValue={1}
                vlaue={review.rating}
                onChangeText={(e)=>handleChange("rating", e)}
            /> */}
            <TextInput placeholder="Additional Comments"
             vlaue={review.description}
             onChangeText={(e)=>handleChange("description", e)}
            
            style={{
                borderWidth: 1,
                marginHorizontal: 15,
                borderRadius: 10,
                paddingBottom: 85,
                paddingHorizontal: 10,
                borderColor: "#777"
            }} />

            <TouchableOpacity onPress={userReview}>
                <Text style={{
                    textAlign: "center",
                    paddingVertical: 10,
                    fontSize: 18,
                    backgroundColor: "#bad759",
                    color: "white",
                    fontWeight: "bold",
                    borderRadius: 15,
                    marginHorizontal: 15,
                }}
                >Rate It
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Ratings;