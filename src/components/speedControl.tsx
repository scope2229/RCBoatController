import React, { FunctionComponent } from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
  withSpring,
} from "react-native-reanimated";
import {snapPoint} from 'react-native-redash';

const SLIDER_HEIGHT = 321;
const SLIDER_MIN_MAX = SLIDER_HEIGHT / 2;

interface JoystickProps {
  setSpeed: any;
}

const SpeedControl: FunctionComponent<JoystickProps> = ({
  setSpeed
}) => {

  let translateY = useSharedValue(0);
  const snapPointsY = [0, SLIDER_HEIGHT - 50];

  const calcvalue = (value) => {
    let v = Math.round(Math.abs(value))
    if (value > 0) {
      return -((v/161) * 100).toFixed(0)
    } else {
      return (((v/161) * 100).toFixed(0))
    }
  }

  const updateCoords = (y) => {
    console.log("CALC", calcvalue(y))
    setSpeed({y: calcvalue(y)})
  }

  const panGestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onStart: (_, ctx) => {
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      console.log("ctx", ctx.startX, "MAX", SLIDER_MIN_MAX, "Y", translateY);
      translateY.value = ctx.startY + event.translationY;
      if (translateY.value > SLIDER_MIN_MAX) {
        if (translateY.value == SLIDER_MIN_MAX) {
          translateY.value = ctx.startY + SLIDER_MIN_MAX 
        } else {
          translateY.value = SLIDER_MIN_MAX
        }
      } else if (translateY.value < -SLIDER_MIN_MAX) {
        if (translateY.value == -SLIDER_MIN_MAX) {
          translateY.value = ctx.startY + -SLIDER_MIN_MAX 
        } else {
          translateY.value = -SLIDER_MIN_MAX
        }
      }
      runOnJS(updateCoords)(translateY.value)
    },
    onEnd: (event) => {
      const snapPointY = snapPoint(translateY.value, event.velocityY, snapPointsY);
      if (translateY.value >= -10 && translateY.value <= 10){
        translateY.value = withSpring(snapPointY, {velocity: event.velocityY});
        runOnJS(updateCoords)(0);
      }      
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY.value }
      ]
    }
  });

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/speedHandle.png')} resizeMode="stretch" style={styles.sliderHandle}>
        <PanGestureHandler onGestureEvent={panGestureHandler}>
          <Animated.Image source={require('../../assets/speedKnob.png')} style={[rStyle, styles.sliderKnob]}/>
        </PanGestureHandler>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: '100%',
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: 'absolute',
    right: 15,
    opacity: 0.6
  },
  sliderHandle: {
    height: SLIDER_HEIGHT,
    width: 50,
    borderRadius: 15,
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 2

  },
  sliderKnob: {
    width: 80,
    height: 40,
    borderRadius: 15,
    backgroundColor: 'transparent',
    borderColor: 'black'
  }
});

export default SpeedControl;