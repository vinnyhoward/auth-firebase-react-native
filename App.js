import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './src/components/common';
import LoginForm from './src/components/LoginForm';
import { APIKEY, AUTHDOMAIN, DATABASEURL, PROJECTID, STORAGEBUCKET, MESSAGINGSENDERID } from 'babel-dotenv';

export default class App extends React.Component {
  state={ loggedIn: null }

  componentWillMount(){
    firebase.initializeApp({
        apiKey: APIKEY,
        authDomain: AUTHDOMAIN,
        databaseURL: DATABASEURL,
        projectId: PROJECTID,
        storageBucket: STORAGEBUCKET,
        messagingSenderId: MESSAGINGSENDERID
    })

    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({ loggedIn: true })
      } else {
        this.setState({ loggedIn: false })
      }
    })
  }

  renderContent() {
    switch(this.state.loggedIn) {
      case true:
      return (
      <Button onPress={ () => firebase.auth().signOut() }>Log Out</Button>
    )
      case false:
      return <LoginForm />;
      default:
      return <Spinner size='large' />;
    }
  }

  render() {
    return (
      <View>
         <StatusBar
        backgroundColor="blue"
        barStyle="light-content"
        />
      <Header headerText="Authentication" />
        { this.renderContent() }
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
