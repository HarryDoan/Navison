import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import List from '@components/List';
const App = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'red',
      }}>
      <View>
        <List />
      </View>
    </SafeAreaView>
  );
};

export default App;
