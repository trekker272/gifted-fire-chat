import React, { Component } from 'react'
import { NavigationActions } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux'

import {
  Platform,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  TouchableHighlight,
  TextInput
} from 'react-native';

const mapStateToProps = function (state) {
  return {
    firebase: state.firebase,
  }
}

class RegisterScreen extends Component {
  state = {
    email: '',
    password: ''
  }

  static navigationOptions = {
    title: 'Register'
  }

  register() {
    this.props.firebase.auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'MainMenu' })
          ]
        })
        this.props.screenProps.rootNavigation.navigate('BoardList');
      })
      .catch(function (error) {
        console.log(error);
        alert(error);
      });
  }

  render() {
    return <View style={styles.container}>
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}
          placeholder={"Email Address"}
        />
        <TextInput
          style={styles.textinput}
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
          secureTextEntry={true}
          placeholder={"Password"}
        />
        <Button title='Register' onPress={() => this.register()} />
      </View>
    </View>
  }
}

export default connect(mapStateToProps, null)(RegisterScreen)

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    flex: 1
  },
  textInput: {
    height: 50,
    width: 250,
    textAlign: 'center'
  },
});