import {ActivityIndicator, View, StyleSheet} from 'react-native'
import React, {useState, useEffect} from 'react'
import Header from '../Header/Header'
import io from 'socket.io-client'
const ENDPOINT = 'http://137.184.102.144:8000/'
import {GiftedChat, Bubble, Send} from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-community/async-storage'
export default function Messages ({navigation}) {
  const [newMessages, setNewMessages] = useState('')
  const [userTalk, setUserTalk]=useState([])
  socket = io(ENDPOINT)
  useEffect(async () => {
    const jsonValue = await AsyncStorage.getItem('user')
    // jsonValue != null ? JSON.parse(jsonValue) : null
    const result = JSON.parse(jsonValue)
    console.log('user wale', result.user)
    setNewMessages(result.user)
    socket.emit('join', result?.user._id)
    socket.on('getMessage', msg => {
      console.log(msg)
      setUserTalk(...msg, {msg})
    })
  }, [])

  const [messages, setMessages] = useState([
    
    /**
     * Mock message data
     */
    // example of system message
    {
      _id: 0,
      text: 'New room created.',
      createdAt: new Date().getTime(),
      system: true,
    },
    // example of chat message
    // {
    //   _id: 1,
    //   text: 'Hello, Rana!',
    //   createdAt: new Date().getTime(),
    //   user: {
    //     _id: 2,
    //     name: 'Test User',
    //   },
    // },
  ])
  function handleSend (newMessage = []) {
    console.log("user.id",newMessages?._id,)
    console.log("mrss", messages)
    socket.emit(
      'message',
      (newMessages?._id, '614df3a5794569032d4b91f0', messages),
    )
  
    setMessages(GiftedChat.append(messages, newMessage))
  }
  console.log("shhshs", messages)

  // Step 2: add a helper method

  function renderLoading () {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#bad759' />
      </View>
    )
  }

  function renderBubble (props) {
    return (
      // Step 3: return the component
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            // Here is the color change
            backgroundColor: '#bad759',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    )
  }
  function scrollToBottomComponent () {
    return (
      <View style={styles.bottomComponentContainer}>
        <IconButton icon='chevron-double-down' size={36} color='#6646ee' />
      </View>
    )
  }
  return (
    <>
      <Header navigation={navigation} component="Message Box" />
      <GiftedChat
        messages={messages}
        onSend={newMessage => handleSend(newMessage)}
        user={{_id: newMessages?._id, name: newMessages?.name}}
        renderBubble={renderBubble}
        placeholder='Type your message here...'
        showUserAvatar
        alwaysShowSend
        scrollToBottomComponent={scrollToBottomComponent}
        // Step 3: add the prop
        renderLoading={renderLoading}
      />
    </>
  )
}

// Step 4: add corresponding styles
const styles = StyleSheet.create({
  // rest remains same
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
