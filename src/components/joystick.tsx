import React, { Component } from "react";
import { Animated, View, StyleSheet, PanResponder } from "react-native";

type JoystickProps = {
  setXY: any
}

export default class Joystick extends Component<JoystickProps> {
  
  state = {
    x: 0,
    y: 0,
  };

  centerPosition() {
    this.pan.setValue({x:0,y:0})
    Animated.timing(
      new Animated.Value(0),
      {
        toValue: this.state.x,
        duration: 0,
        useNativeDriver: false
      }
    ).start()
    Animated.timing(
      new Animated.Value(0),
      {
        toValue: this.state.y,
        duration: 0,
        useNativeDriver: false
      }
    ).start()
  }
  pan = new Animated.ValueXY();
  panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      // this.pan.setOffset({
      //   x: this.pan.x._value,
      //   y: this.pan.y._value
      // });
    },
    onPanResponderMove: Animated.event([
      null,
      { dx: this.pan.x, dy: this.pan.y }
    ],
      { listener: (_event, _gestureState) => {
        this.props.setXY({x: this.pan.x, y: this.pan.y})
      }}
    ),
    onPanResponderRelease: () => {
      this.props.setXY({x:0,y:0});
      this.pan.flattenOffset();
      this.centerPosition();
    }
  });

  render() {
    return (
      <View style={styles.container}>
        <Animated.View style={styles.outerJoystick}>
          <Animated.View
            style={{
              transform: [{
                translateX: this.pan.x.interpolate({
                  inputRange: [-100, 100],
                  outputRange: [0, 100],
                  extrapolate: 'clamp'
                })
              }, {
                translateY: this.pan.y.interpolate({
                  inputRange: [-100, 100],
                  outputRange: [0, 100],
                  extrapolate: 'clamp'
                })
              }]
            }}
            {...this.panResponder.panHandlers}
          >
            <View style={styles.innerJoystick} />
          </Animated.View>
        </Animated.View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    width: 175,
    height: 175,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  outerJoystick: {
    width: 175,
    height: 175,
    borderRadius: 200,
    backgroundColor: 'lightgrey',
    position: 'absolute',
    bottom: 50,
    left: 50,
    opacity: 0.5,
    borderColor: 'black',
    borderWidth: 2,
  },
  innerJoystick: {
    width: 75,
    height: 75,
    borderRadius: 200,
    backgroundColor: 'black',
  }
});

// export default Joystick;