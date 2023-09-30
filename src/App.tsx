import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
const App = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'red',
      }}>
      <View>
        <Text>App</Text>
      </View>
    </SafeAreaView>
  );
};

export default App;
