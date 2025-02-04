import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';

const AssetDetailScreen = ({ route, navigation }) => {
  const { asset, onDelete } = route.params;

  const handleDelete = () => {
    Alert.alert('Confirm', 'Are you sure you want to delete this asset?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          onDelete(asset.id);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{asset.name}</Text>
      <Text>{asset.description}</Text>
      <Text>Register Date: {asset.registerDate}</Text>
      <Text>Status: {asset.isActive ? 'Active' : 'Inactive'}</Text>
      <Button title="Edit" onPress={() => navigation.navigate('AssetForm', { asset })} />
      <Button title="Delete" color="red" onPress={handleDelete} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
});

export default AssetDetailScreen;
