/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Button, TextInput} from 'react-native';
import BleManager from 'react-native-ble-manager';

const BLE = () => {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    BleManager.start({showAlert: false});
  }, []);

  const scanForDevices = () => {
    BleManager.scan([], 5, true)
      .then((res: any) => {
        console.log('Scanning for BLE devices...: ', res);
        setDevices(res);
      })
      .catch(error => {
        console.error('Error starting scan:', error);
      });
  };

  const connectToDevice = (device: any) => {
    setSelectedDevice(device);
    BleManager.connect(device.id)
      .then(() => {
        console.log(`Connected to ${device.name}`);
      })
      .catch(error => {
        console.error('Error connecting to the device:', error);
      });
  };

  const sendCredentials = () => {
    if (selectedDevice) {
      const wifiCredentials = {
        ssid,
        password,
      };
      const data: any = new TextEncoder().encode(
        JSON.stringify(wifiCredentials),
      );

      BleManager.write(
        selectedDevice?.id,
        'YOUR_SERVICE_UUID',
        'YOUR_CHARACTERISTIC_UUID',
        data,
      )
        .then(() => {
          console.log('Wi-Fi credentials sent successfully.');
        })
        .catch(error => {
          console.error('Error sending Wi-Fi credentials:', error);
        });
    }
  };

  return (
    <View>
      <Button title="Scan for Devices" onPress={scanForDevices} />
      <FlatList
        data={devices}
        keyExtractor={(item: any) => item?.id}
        renderItem={({item}) => (
          <Text onPress={() => connectToDevice(item)}>{item?.name}</Text>
        )}
      />
      {selectedDevice && (
        <View>
          <TextInput
            placeholder="Wi-Fi SSID"
            value={ssid}
            onChangeText={setSsid}
          />
          <TextInput
            placeholder="Wi-Fi Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button title="Send to ESP" onPress={sendCredentials} />
        </View>
      )}
    </View>
  );
};

export default BLE;
