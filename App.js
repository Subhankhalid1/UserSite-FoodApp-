import React, {useEffect, useState} from 'react'
import {View, LogBox} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {createDrawerNavigator} from '@react-navigation/drawer'
import SplashScreen from './src/screens/SplashScreen'
import ScreenOne from './src/screens/ScreenOne'
import ScreenTwo from './src/screens/ScreenTwo'
import ScreenThree from './src/screens/ScreenThree'
import Home from './src/components/Home/Home'
import Signup from './src/components/Signup/Signup'
import Login from './src/components/Login/Login'
import DrawerContent from './src/screens/DrawerContent'
import Icon from 'react-native-vector-icons/Feather'
import Discover from './src/components/Discover/Discover'
import Popular from './src/components/Popular/Popular'
import Profile from './src/components/Profile/Profile'
import Setting from './src/components/Setting/Setting'
import RestaurantDetail from './src/components/RestaurantDetail/RestaurantDetail'
import ProductDetail from './src/components/ProductDetail/ProductDetail'
import PlacedOrder from './src/components/OrderPlaced/Placed'
import Payment from './src/components/Payment/Payment'
import Congrats from './src/components/Congrats/Congrats'
import Ratings from './src/components/Rating/Rating'
import Tracker from './src/components/Tracker/Tracker'
import Context from './src/context/Context'
import AsyncStorage from '@react-native-community/async-storage'
import Messages from './src/components/message/message'

LogBox.ignoreLogs(['Reanimated 2'])
LogBox.ignoreLogs(['VirtualizedLists should never be nested'])

const DrawerScreen = () => {
  const Drawer = createDrawerNavigator()
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name='Home' component={BottomTabScreen} />
    </Drawer.Navigator>
  )
}

const BottomTabScreen = () => {
  const Tab = createBottomTabNavigator()
  return (
    <Tab.Navigator
      initialRouteName='Home'
      tabBarOptions={{
        showLabel: false,
        style: {
          elevation: 0,
          backgroundColor: '#fff',
        },
      }}>
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View style={{alignItems: 'center'}}>
                <Icon
                  name='home'
                  size={28}
                  color={focused ? '#bad759' : 'black'}
                />
              </View>
            )
          },
        }}
      />
      <Tab.Screen
        name='Discover'
        component={Discover}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View style={{alignItems: 'center'}}>
                <Icon
                  name='map-pin'
                  size={28}
                  color={focused ? '#bad759' : 'black'}
                />
              </View>
            )
          },
        }}
      />
      <Tab.Screen
        name='Popular'
        component={Popular}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View style={{alignItems: 'center'}}>
                <Icon
                  name='star'
                  size={28}
                  color={focused ? '#bad759' : 'black'}
                />
              </View>
            )
          },
        }}
      />
      <Tab.Screen
        name='Profile'
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View style={{alignItems: 'center'}}>
                <Icon
                  name='user'
                  size={28}
                  color={focused ? '#bad759' : 'black'}
                />
              </View>
            )
          },
        }}
      />
    </Tab.Navigator>
  )
}

const App = () => {
  const [auth, setAuth] = useState()
  const Stack = createStackNavigator()
  const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 1000,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.09,
      restSpeedThreshold: 0.09,
    },
  }
  useEffect(async () => {

    const jsonValue = await AsyncStorage.getItem('user')
    const result=jsonValue != null ? JSON.parse(jsonValue) : null
    console.log('user', result)
    setAuth(result?.user?._id)
  })

  return (
    <SafeAreaProvider>
      <Context>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName='Home'
            headerMode='none'
            screenOptions={{
              gestureEnabled: true,
              gestureDirection: 'horizontal',
              transitionSpec: {
                open: config,
                close: config,
              },
            }}>
               {/* {auth == null ? (<> */}
                <Stack.Screen name='Splash' component={SplashScreen} />
            <Stack.Screen name='One' component={ScreenOne} />
            <Stack.Screen name='Two' component={ScreenTwo} />
            <Stack.Screen name='Three' component={ScreenThree} />
          
            <Stack.Screen name='Register' component={Signup} />
            <Stack.Screen name='Login' component={Login} />
               {/* </>):(
               <> */}
               
            <Stack.Screen name='Home' component={DrawerScreen} />
            <Stack.Screen name='Discover' component={DrawerScreen} />
            <Stack.Screen name='Profile' component={DrawerScreen} />
            <Stack.Screen name='Setting' component={Setting} />
            <Stack.Screen name='ResDetail' component={RestaurantDetail} />
            <Stack.Screen name='ProdDetail' component={ProductDetail} />
            <Stack.Screen name='Tracker' component={Tracker} />
            <Stack.Screen name='PlacedOrder' component={PlacedOrder} />
            <Stack.Screen name='Payment' component={Payment} />
            <Stack.Screen name='Congrats' component={Congrats} />
            <Stack.Screen name='Messages' component={Messages} />
            <Stack.Screen name='Ratings' component={Ratings} />

               {/* </>
               )} */}
            
          </Stack.Navigator>
        </NavigationContainer>
      </Context>
    </SafeAreaProvider>
  )
}

export default App
