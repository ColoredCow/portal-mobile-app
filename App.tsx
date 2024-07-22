import React from 'react';
import { Text, View, StyleSheet } from 'react-native';


function App(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Welcome to Employee Portal! 🚀
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    color: 'black',
  }
});

export default App;
