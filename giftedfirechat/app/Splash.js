import React, { Component } from 'react'
import { Link } from 'react-router-native'
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TextInput
} from 'react-native';

export default class Splash extends Component {
  async signup(email, pass) {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, pass);
      console.log("Account created");

      // Navigate to the Home page, the user is auto logged in
      props.router.push('/some/path')

    } catch (error) {
      console.log(error.toString())
    }
  }

  render() {
    return <View style={styles.container}>
      <TouchableHighlight onPress={() => console.log('gmail')}>
        <Text style={styles.text}>Gmail</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={() => console.log('facebook')}>
        <Text style={styles.text}>Facebook</Text>
      </TouchableHighlight>
      <Link to='/boardTabs' replace>
        <Text style={styles.text}>Just go to boards...</Text>
      </Link>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 20
  }
});