import React, { FunctionComponent, useState } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeScreen, NetworkScreen, SettingsScreen } from "../screens";
import Icon from "react-native-vector-icons/Ionicons";

const Drawer = createDrawerNavigator();

type ScreenType = {
  name: string;
  icon: string;
  component: FunctionComponent;
}

const screenList: Array<ScreenType> = [
  {
    name: "HomeScreen",
    icon: "home",
    component: HomeScreen,
  },
  {
    name: "NetworkScreen",
    icon: "wifi",
    component: NetworkScreen,
  },
  {
    name: "SettingsScreen",
    icon: "settings",
    component: SettingsScreen,
  },
];

function CustomDrawerContent({ navigation }) {
  const [currentScreen, setCurrentScreen] = useState("HomeScreen");

  return (
    <>
      <View style={[styles.container, { justifyContent: 'space-between', alignItems: 'center' }]}>
        {screenList.map((screen, i) => (
          <Pressable
            key={i}
            style={({ pressed }) => [
              styles.button,
              {
                backgroundColor: pressed
                  ? 'lightgreen'
                  : currentScreen == screen.name? 'lightblue' : 'aliceblue'
              },
            ]}
            onPress={() => {
              setCurrentScreen(screen.name);
              navigation.navigate(screen.name);
              navigation.openDrawer();
            }}
          >
            <Icon name={screen.icon} size={75} />
          </Pressable>
        ))}
      </View>
    </>
  );
}

const Navigator: FunctionComponent = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        defaultStatus="open"
        initialRouteName="HomeScreen"
        screenOptions={{
          drawerPosition: 'right',
          headerShown: false,
          drawerStyle: {
            width: 125
          },
          drawerContentContainerStyle: {
            backgroundColor: 'red'
          }
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        {screenList.map((screen, i) => (
          <Drawer.Screen
            key={i}
            name={screen.name}
            component={screen.component}
          />
        ))}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 15,
    marginTop: 15
  },
  button: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'aliceblue',
    borderRadius: 15,

  },
});

export default Navigator;