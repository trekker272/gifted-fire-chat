import React, { Component } from 'react'
import { NavigationActions } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux'

import { CoreNavBar } from './CoreNavBar'

import {
  Platform,
  View,
  Text,
  ScrollView,
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

class SettingsScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Settings',
    drawerIcon: ({ tintColor }) => (
      <MaterialIcons name="settings" size={24} style={{ color: tintColor }} />
    ),
  };

  signOut() {
    this.props.firebase.auth().signOut()
      .then(() => {
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'SignIn' })
          ]
        })
        this.props.screenProps.rootNavigation.dispatch(resetAction);
      }).catch(function (error) {
        console.log(error);
        alert(error);
      });
  }

  render() {
    return <View style={styles.container}>
      <CoreNavBar banner={'Settings'} navigation={this.props.navigation} />
      <TouchableHighlight onPress={() => this.signOut()}><Text>Sign out</Text></TouchableHighlight>
    </View>
  }
}
export default connect(mapStateToProps, null)(SettingsScreen)

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    flex: 1
  },
});