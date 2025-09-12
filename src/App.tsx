import { PropsWithChildren } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, storePersistor } from '@/store';
import Theme from '@/styles/theme';
import { RootStackNavigation } from '@/navigators';

function Providers({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={storePersistor}>
        <GestureHandlerRootView>
          <SafeAreaProvider>
            <NavigationContainer theme={Theme}>{children}</NavigationContainer>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}

function Root() {
  return (
    <Providers>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <RootStackNavigation />
    </Providers>
  );
}

export default Root;
