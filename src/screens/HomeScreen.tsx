import React, { FunctionComponent, useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import {  Joystick, SpeedControl } from "../components";

const HomeScreen: FunctionComponent = () => {
  const [getXY, setXY] = useState({})
  const [getSpeed, setSpeed] = useState({})

  useEffect(()=> {
    console.log("XY",getXY)
    console.log("Y",getSpeed);
  },[getXY, getSpeed]);

  return (
    <>
      <Text>
        Home
      </Text>

      <Joystick setXY={setXY}/>

      <SpeedControl setSpeed={setSpeed}/>

    </>
  );
};

const styles = StyleSheet.create({
  
})

export default HomeScreen;
