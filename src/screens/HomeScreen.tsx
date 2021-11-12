import React, { FunctionComponent, useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { Joystick } from "../components";

const HomeScreen: FunctionComponent = () => {
  const [getXY, setXY] = useState()

  useEffect(()=> {
    console.log("XY",getXY)
  },[getXY])
  return (
    <>
      <Text>
        Home
      </Text>
      <Joystick setXY={setXY}/>
    </>
  );
};

const styles = StyleSheet.create({
  joystick: {
    backgroundColor: 'grey',
    opacity: 0.5,
    borderColor: 'black',
    borderWidth: 2,
    position: 'absolute',
    bottom: 10,
    left: 10,
  }
})

export default HomeScreen;
