import React, {useState} from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import Header from '../Header/Header';
import Pic from "../../assets/SliderImage/subhan.jpg";
import Form from './Form';

const Profile = ({ navigation }) => {
    const [defaultImg, setDefaultImg]=useState(true)
    const UploadImage=()=>{
 
        this.setDefaultImg({ loadingImage: true });
     
      }
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <Header navigation={navigation} component="Profile" />
            <ScrollView>
                <View style={styles.profile}>
                    <Image source={defaultImg?Pic: 
           require('../../assets/user.png')}  style={{ width: 150, height: 150, borderRadius: 50 }} />
                    <Text style={{ color: "white", fontSize: 25, marginTop: 5 }}>Rana Subhan</Text>
                    <Text style={{ color: "white", fontSize: 15, marginTop: 5 }}>Okara, Pakistan</Text>
                </View>
                <Form UploadImage={UploadImage}/>
            </ScrollView>
        </View>
    )
}

export default Profile;

const styles = StyleSheet.create({
    profile: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 45,
        backgroundColor: "#bad759",
        borderTopColor: "white",
        borderWidth: 1,
        borderBottomColor: "#bad759",
        borderLeftColor: "#bad759",
        borderRightColor: "#bad759",
    }
})