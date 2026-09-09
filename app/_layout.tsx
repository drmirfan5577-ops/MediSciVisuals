import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AlertProvider } from '@/template';
import { BookmarkProvider } from '@/contexts/BookmarkContext';

export default function RootLayout() {
  return (
    <AlertProvider>
      <SafeAreaProvider>
        <BookmarkProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="onboarding" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen
              name="template-detail"
              options={{ headerShown: false, presentation: 'modal' }}
            />
            <Stack.Screen
              name="viewer"
              options={{ headerShown: false, presentation: 'modal' }}
            />
            <Stack.Screen
              name="player"
              options={{ headerShown: false, presentation: 'modal' }}
            />
            <Stack.Screen
              name="quiz"
              options={{ headerShown: false, presentation: 'modal' }}
            />
            <Stack.Screen
              name="search"
              options={{ headerShown: false, presentation: 'modal' }}
            />
          </Stack>
        </BookmarkProvider>
      </SafeAreaProvider>
    </AlertProvider>
  );
}
