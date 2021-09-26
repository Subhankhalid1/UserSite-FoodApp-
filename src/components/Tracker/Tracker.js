 import React, { useState, useEffect } from 'react';
 import { Dimensions, StyleSheet } from 'react-native';
 import MapView from 'react-native-maps';
 import MapViewDirections from 'react-native-maps-directions';
 import GetLocation from 'react-native-get-location';
 const { width, height } = Dimensions.get('window');
 const ASPECT_RATIO = width / height;
 const LATITUDE = 37.771707;
 const LONGITUDE = -122.4053769;
 const LATITUDE_DELTA = 0.0922;
 const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
 
 const GOOGLE_MAPS_APIKEY = 'AIzaSyBF_7sBJSSFjkiAfQghD3MV9vsbO6qSwDk';
 
 const Tracker =()=> {
 
   
     // AirBnB's Office, and Apple Park
    const [state, setState] = useState( { origins:  {
     latitude: 31.4504,
     longitude:73.1350 
   },
 destination:  {
     latitude: 31.1505,
     longitude: 72.6812,
   }
 }
 )
  var mapView = null     
     // onMapPress = (e) => {
     //   this.setState({
     //     coordinates: [
     //       ...this.state.coordinates,
     //       e.nativeEvent.coordinate,
     //     ],
     //   });
     // }
   useEffect(()=>{
     GetLocation.getCurrentPosition({
         enableHighAccuracy: true,
         timeout: 15000,
     })
     .then(location => {
         console.log("latitudes",location.latitude);
         setState({
          
          destination:{ 
            ...state.destination,
          },
         origins:{
             latitude: location.latitude,
             longitude: location.longitude
          } });
     })
     .catch(error => {
         const { code, message } = error;
         console.warn(code, message);
     })
   })
  console.log(state)
     return (
       <MapView
         initialRegion={{
           latitude: LATITUDE,
           longitude: LONGITUDE,
           latitudeDelta: LATITUDE_DELTA,
           longitudeDelta: LONGITUDE_DELTA,
         }}
         style={StyleSheet.absoluteFill}
         ref={c => mapView = c}
         // onPress={this.onMapPress}
       >
  
           <MapView.Marker coordinate={state.origins} />
           <MapView.Marker coordinate={state.destination} />
        
           <MapViewDirections
             origin={state.origins}
             // waypoints={state.slice(1, -1)}
             destination={state.destination}
             apikey={GOOGLE_MAPS_APIKEY}
             strokeWidth={10}
             strokeColor="hotpink"
             optimizeWaypoints={true}
             onStart={(params) => {
               console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
             }}
             onReady={result => {
               console.log(`Distance: ${result.distance} km`)
               console.log(`Duration: ${result.duration} min.`)
               
               mapView.fitToCoordinates(result.coordinates, {
                 edgePadding: {
                   right: (width / 20),
                   bottom: (height / 20),
                   left: (width / 20),
                   top: (height / 20),
                 }
               });
            
             }}
             onError={(errorMessage) => {
               // console.log('GOT AN ERROR');
             }}
           />
         
       </MapView>
     );
   }
 
 export default Tracker;