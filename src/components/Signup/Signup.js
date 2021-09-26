import React, {useState} from 'react'
import axios from 'axios'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native'
import {Input} from 'react-native-elements'
import * as Animatable from 'react-native-animatable'
import AsyncStorage from '@react-native-community/async-storage'

// import {Globalcontext} from '../../context/Context'
const {height} = Dimensions.get('screen')
// const { userRegister, setUserRegister } = useContext(Globalcontext);
const Signup = ({navigation}) => {
  //   const {userRegister, setUserRegister} = useContext(Globalcontext)
 
  const [user, setUser] = useState({
    name: ' ',
    email: ' ',
    password: ' ',
    phone: ' ',
  })
  const handleChange = (name, value) => {
    setUser({
      ...user,
      [name]: value,
    })
  }
  console.log(user)
  const handleSignUp = async e => {
    // e.preventDefault()
    // const params=JSON.stringify(user)
    
    await axios
      .post(`http://137.184.102.144:8000/api/user/register`, user)
      .then(async function (response) {
        // handle success
        console.log('response', JSON.stringify(response.data))

        const jsonValue = JSON.stringify(response.data)
        await AsyncStorage.setItem('user', jsonValue)

        //navigation.navigate('Home')
      })
      .catch(function (error) {
        // handle error
        console.warn(error.message)
      })
    // localStorage.setItem('token', JSON.stringify(data.token))
    // await AsyncStorage.setItem(compoundKey, JSON.stringify(data));

    // setUserRegister(data.user)
  }

  return (
    <ScrollView style={styles.main}>
      <View style={styles.headingView}>
        <Animatable.Text
          animation='fadeInRight'
          duration={1000}
          style={styles.headingText}>
          Welcome !
        </Animatable.Text>
      </View>
      <Animatable.View
        animation='fadeInUpBig'
        duration={1000}
        style={styles.formView}>
        <Input
          placeholder='Name'
          vlaue={user.name}
          name='name'
          onChangeText={e => handleChange('name', e)}
        />
        <Input
          placeholder='Email'
          name='email'
          vlaue={user.email}
          onChangeText={e => handleChange('email', e)}
        />
        <Input
          placeholder='Password'
          name='password'
          secureTextEntry={true}
          vlaue={user.password}
          onChangeText={e => handleChange('password', e)}
        />
        <Input
          placeholder='Phone'
          name='phone'
          vlaue={user.phone}
          onChangeText={e => handleChange('phone', e)}
        />
        <View style={{flexDirection: 'row', paddingLeft: 10}}>
          <Text style={{fontSize: 15}}>Already have an account ? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text
              style={{
                fontSize: 15,
                color: '#bad759',
                textDecorationLine: 'underline',
              }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{paddingHorizontal: 50}}
          onPress={handleSignUp}>
          <Text style={styles.button}>Register</Text>
        </TouchableOpacity>
      </Animatable.View>
    </ScrollView>
  )
}

export default Signup

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#bad759',
    flex: 1,
  },
  headingText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  headingView: {
    justifyContent: 'center',
    height: height / 3,
  },
  formView: {
    height: height / 1.59,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  button: {
    backgroundColor: '#bad759',
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    paddingVertical: 8,
    borderRadius: 50,
    marginTop: 20,
  },
})
