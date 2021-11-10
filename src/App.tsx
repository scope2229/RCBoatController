/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

import RNBootSplash from "react-native-bootsplash";

import {
  Colors,
  Header,
  LearnMoreLinks,
} from 'react-native/Libraries/NewAppScreen';

import Orientation from 'react-native-orientation-locker';

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
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.backgroundStyle}>
        <Header />
        <View
          style={styles.viewStyle}>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


export default App;
