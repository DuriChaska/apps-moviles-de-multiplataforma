import { Redirect, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { getToken } from '../../utils/tokenStorage';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function AppLayout() {
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      const token = await getToken();
      setIsLoggedIn(!!token);
      setChecking(false);
    })();
  }, []);

  if (checking) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }

    return (
    <Stack>
        <Stack.Screen name="index" options={{ title: 'Productos' }} />
        <Stack.Screen name="details" options={{ title: 'Detalle' }} />
    </Stack>
    );
}