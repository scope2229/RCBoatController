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
  
})

export default HomeScreen;
