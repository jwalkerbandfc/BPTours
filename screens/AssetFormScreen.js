import React, { useState } from 'react';
import { View, TextInput, Button, Switch, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AssetFormScreen = ({ route, navigation }) => {
  const { assets, setAssets, asset } = route.params || {};
  
  const [name, setName] = useState(asset?.name || '');
  const [description, setDescription] = useState(asset?.description || '');
  const [registerDate, setRegisterDate] = useState(asset?.registerDate || new Date().toISOString().split('T')[0]);
  const [isActive, setIsActive] = useState(asset?.isActive || false);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Asset name is required');
      return;
    }

    const newAsset = {
      id: asset?.id || Date.now().toString(),
      name,
      description,
      registerDate,
      isActive,
    };

    let updatedAssets = assets ? [...assets] : [];
    if (asset) {
      updatedAssets = updatedAssets.map(a => (a.id === asset.id ? newAsset : a));
    } else {
      updatedAssets.push(newAsset);
    }

    await AsyncStorage.setItem('assets', JSON.stringify(updatedAssets));
    setAssets(updatedAssets);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Asset Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} />
      <TextInput style={styles.input} placeholder="Register Date" value={registerDate} editable={false} />
      <View style={styles.switchContainer}>
        <Switch value={isActive} onValueChange={setIsActive} />
        <Button title="Save Asset" onPress={handleSave} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
  switchContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});

export default AssetFormScreen;
