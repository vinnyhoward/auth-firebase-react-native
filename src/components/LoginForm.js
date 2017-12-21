import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner  } from './common';

export default class LoginForm extends Component {
  constructor() {
    super()
    this.state = { 
      email: '', 
      password: '', 
      error: '',
      loading: false,
    }
    this.onButtonPress = this.onButtonPress.bind(this)
  }

  onButtonPress() {

    const { email,password } = this.state;

    this.setState({ error: '', loading: true })

    firebase.auth().signInWithEmailAndPassword( email, password )
    .then(this.onLoginSuccess.bind(this))
    .catch( () => {
      firebase.auth().createUserWithEmailAndPassword( email, password )
      .then(this.onLoginSuccess.bind(this))
      .catch(this.onLoginFail.bind(this))
    })
  }

  onLoginFail(){
    this.setState({
      error: 'Authentication Failed.',
      loading: false
    })
  }

  onLoginSuccess(){
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    })
  }

  renderButton() {
    if(this.state.loading) {
      return <Spinner size='small' />
    }

    return (
      <Button onPress={ this.onButtonPress }>
      Log-In
      </Button>
    )
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input 
          placeholder="user@gmail.com"
          label="Email"
          value={ this.state.email }
          onChangeText={ email => this.setState({ email })}
          />
        </CardSection>

        <CardSection>
          <Input 
          secureTextEntry={ true }
          placeholder="password"
          label="Password"
          value={ this.state.password }
          onChangeText={ password => this.setState({ password })}
          style={{ height: 20, width: 100 }}
          />
        </CardSection>

        <Text style={ styles.errorTextStyles }>
          { this.state.error }
        </Text>

        <CardSection>
          { this.renderButton() }
        </CardSection>
      </Card>
    )
  }
}

const styles = {
  errorTextStyles: {
    fontSize: 14,
    alignSelf: 'center',
    color: 'red'
  }
}