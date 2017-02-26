import Exponent from 'exponent';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import Hexbins from './Hexbins';

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ marginTop: 40, fontSize: 20 }}>A simple react-native-svg + D3 example</Text>
        <Hexbins />
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

Exponent.registerRootComponent(App);
