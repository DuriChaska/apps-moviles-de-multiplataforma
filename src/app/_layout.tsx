import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/login" options={{ title: 'Iniciar sesión' }} />
        <Stack.Screen name="explore" />
      </Stack>
    </SafeAreaProvider>
  );
}

