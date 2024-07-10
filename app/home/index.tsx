// home/Home.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { styles } from './styles';

interface HomeProps {
  onLogout: () => void;
}

const Home: React.FC<HomeProps> = ({ onLogout }) => {
  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.title}>Home</Text>
        <Button title="Logout" onPress={onLogout} />
      </View>
      <View style={styles.content}>
        <Text>Welcome to the home page!</Text>
      </View>
    </View>
  );
};

export default Home;
