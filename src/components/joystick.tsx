import React, { FunctionComponent } from "react";
import { StyleSheet, View } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
} from "react-native-reanimated";

interface JoystickProps {
  setXY: any;
}

const Joystick: FunctionComponent<JoystickProps> = ({
  setXY
}) => {

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const maxXY = 60
  const minXY = -60

  const calcValue = (value: number) => {
    let v = Math.round(Math.abs(value))
    if (value > 0) {
      return -((v / maxXY) * 100).toFixed(0)
    } else {
      return (((v / maxXY) * 100).toFixed(0))
    }
  }

  const updateCoords = (x: number, y: number) => {
    setXY({ x: calcValue(x), y: calcValue(y) })
  }

  const panGestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onStart: (_) => {},
    onActive: (event) => {
      translateX.value = (event.translationX > maxXY) ? maxXY :
        (event.translationX < minXY) ? minXY :
          event.translationX;
      translateY.value = (event.translationY > maxXY) ? maxXY :
        (event.translationY < minXY) ? minXY :
          event.translationY;

      runOnJS(updateCoords)(translateX.value, translateY.value);
    },
    onEnd: (_event) => {
      translateX.value = 0;
      translateY.value = 0;

      runOnJS(updateCoords)(0, 0);
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value }
      ]
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.outerJoystick}>
        <PanGestureHandler onGestureEvent={panGestureHandler}>
          <Animated.View style={rStyle}>
            <View style={styles.innerJoystick}></View>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 175,
    height: 175,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: 'absolute',
    bottom: 25,
    left: 25,
  },
  outerJoystick: {
    width: 175,
    height: 175,
    borderRadius: 200,
    backgroundColor: 'lightgrey',
    opacity: 0.5,
    borderColor: 'black',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerJoystick: {
    width: 60,
    height: 60,
    borderRadius: 200,
    backgroundColor: 'black',
  }
});

export default Joystick;