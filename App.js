import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AssetFormScreen from './screens/AssetFormScreen';
import AssetDetailScreen from './screens/AssetDetailScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AssetForm" component={AssetFormScreen} options={{ title: 'Add / Edit Asset' }} />
        <Stack.Screen name="AssetDetail" component={AssetDetailScreen} options={{ title: 'Asset Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;