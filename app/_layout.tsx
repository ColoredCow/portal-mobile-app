import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import Login from './login';
import Home from './home';
import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('userToken');
      setLoggedIn(token !== null);
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      setLoggedIn(false);
    } catch (e) {
      console.error('Failed to clear the async storage', e);
    }
  };

  if (!loaded || loggedIn === null) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {!loggedIn ? (
        <Login setLoggedIn={setLoggedIn} />
      ) : (
        <Home onLogout={handleLogout} />
      )}
    </ThemeProvider>
  );
}
