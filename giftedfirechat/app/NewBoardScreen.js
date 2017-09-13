import React, { Component } from 'react'
import { NavigationActions } from 'react-navigation'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  TouchableHighlight,
  TextInput
} from 'react-native';

export default class NewBoardScreen extends Component {
  constructor(props) {
    super(props);
    this.boardsRef = props.screenProps.firebaseRef.child('boards');
    this.state = { text: '' }
  }

  static navigationOptions = {
    title: "New Board"
  }

  onCreate(name) {
    if (!name || name === '')
      return;

    const board = {
      name,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      lat: 1,
      long: 1,
      messages: []
    };

    const newBoard = this.boardsRef.push(board);

    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'MainMenu' }),
        NavigationActions.navigate({
          routeName: 'BoardView', params: {
            name: board.name,
            key: newBoard.key
          }
        })
      ]
    })
    this.props.rootNavigation.navigate('BoardList');
  }

  render() {
    return <View>
      <TextInput
        style={styles.textInput}
        placeholder="Give your board a name..."
        onChangeText={(text) => this.setState({ text })}
      />
      <Button title='Go' onPress={() => this.onCreate(this.state.text)} />
    </View>
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    width: 250,
    textAlign: 'center'
  }
});