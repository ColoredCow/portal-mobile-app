import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles';

interface LoginProps {
  setLoggedIn: (loggedIn: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleRegister = async () => {
    if (email && password && confirmPassword && password === confirmPassword) {
      const user = { email, password };
      try {
        const users = await AsyncStorage.getItem('users');
        const usersArray = users ? JSON.parse(users) : [];
        usersArray.push(user);
        await AsyncStorage.setItem('users', JSON.stringify(usersArray));
        setIsRegistering(false);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        alert('Registration successful! Please log in.');
      } catch (e) {
        console.error('Failed to save the user to the storage', e);
      }
    } else {
      alert('Please enter both email, password, and confirm password or confirm password does not match.');
    }
  };

  const handleLogin = async () => {
    try {
      const users = await AsyncStorage.getItem('users');
      const usersArray = users ? JSON.parse(users) : [];
      const user = usersArray.find((user: any) => user.email === email && user.password === password);
      if (user) {
        const fakeToken = '12345';
        await AsyncStorage.setItem('userToken', fakeToken);
        setLoggedIn(true);
      } else {
        alert('Invalid email or password');
      }
    } catch (e) {
      console.error('Failed to retrieve users from storage', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isRegistering ? 'Register' : 'Login'}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputField}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputField}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!passwordVisible}
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => setPasswordVisible(!passwordVisible)}
        >
          <MaterialIcons name={passwordVisible ? 'visibility-off' : 'visibility'} size={20} />
        </TouchableOpacity>
      </View>
      {isRegistering && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputField}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!confirmPasswordVisible}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
          >
            <MaterialIcons name={confirmPasswordVisible ? 'visibility-off' : 'visibility'} size={20} />
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.buttonGroup}>
        <View style={styles.button}>
          {isRegistering ? (
            <Button title="Register" onPress={handleRegister} />
          ) : (
            <Button title="Login" onPress={handleLogin} />
          )}
        </View>
        <View style={styles.button}>
          <Button
            title={isRegistering ? 'Go to Login' : 'Go to Register'}
            onPress={() => setIsRegistering(!isRegistering)}
            color="gray"
          />
        </View>
      </View>
    </View>
  );
};

export default Login;
