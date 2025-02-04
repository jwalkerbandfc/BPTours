import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    loadAssets();
  }, []);

  const loadAssets = async () => {
    const storedAssets = await AsyncStorage.getItem('assets');
    if (storedAssets) {
      setAssets(JSON.parse(storedAssets));
    }
  };

  const deleteAsset = async (id) => {
    const updatedAssets = assets.filter(asset => asset.id !== id);
    setAssets(updatedAssets);
    await AsyncStorage.setItem('assets', JSON.stringify(updatedAssets));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={assets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.assetItem}
            onPress={() => navigation.navigate('AssetDetail', { asset: item, onDelete: deleteAsset })}
          >
            <Text style={styles.assetTitle}>{item.name}</Text>
            <Text>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
      <Button title="Add Asset" onPress={() => navigation.navigate('AssetForm', { assets, setAssets })} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  assetItem: { padding: 15, borderBottomWidth: 1 },
  assetTitle: { fontSize: 18, fontWeight: 'bold' },
});

export default HomeScreen;
