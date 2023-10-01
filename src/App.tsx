import {View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import List from '@components/List';
import BLE from '@components/BLE';
const App = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'red',
      }}>
      <View>
        <List />
        <BLE />
      </View>
    </SafeAreaView>
  );
};

export default App;
