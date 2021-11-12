/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import {
  StyleSheet,
  useColorScheme,
} from 'react-native';

import RNBootSplash from "react-native-bootsplash";

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import Orientation from 'react-native-orientation-locker';
import Navigator from './navigation/navigator';

const App = () => {

  useEffect(() => {
    setTimeout(()=> RNBootSplash.hide({fade: true}), 2500);
  }, []);

  const isDarkMode = useColorScheme() === 'dark';

  Orientation.lockToLandscape();

  const styles = StyleSheet.create({
    backgroundStyle: {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    },
    viewStyle: {
      backgroundColor: isDarkMode ? Colors.black : Colors.white,
    },
  });

  return (
    <Navigator/>
  );
};


export default App;
