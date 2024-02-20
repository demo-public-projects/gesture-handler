import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

function Ball() {
  const isPressed = useSharedValue(false);
  const isTapped = useSharedValue(false);
  const offset = useSharedValue({ x: 0, y: 0 });
  function scaleEval() {
    "worklet";
    return isPressed.value ? 1.3 : 1;
  }
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scaleEval() },
      { translateX: offset.value.x / scaleEval() },
      { translateY: offset.value.y / scaleEval() },
    ],
    backgroundColor: isTapped.value ? "red" : "blue",
    opacity: isPressed.value ? 1 : 0.5,
  }));

  const pan = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = true;
    })
    .onChange((event) => {
      offset.value = {
        x: offset.value.x + event.changeX,
        y: offset.value.y + event.changeY,
      };
    })
    .onFinalize(() => {
      isPressed.value = false;
      offset.value = withSpring(
        { x: 0, y: 0 },
        { mass: 2.4, stiffness: 325, damping: 8 }
      );
    });

  const tap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      isTapped.value = true;
      offset.value = withTiming({ x: 0, y: -200 }, undefined, () => {
        offset.value = withSpring(
          { x: 0, y: 0 },
          { mass: 2.4, stiffness: 325, damping: 8 },
          () => (isTapped.value = false)
        );
      });
    });

  return (
    <GestureDetector gesture={Gesture.Race(tap, pan)}>
      <Animated.View style={[styles.ball, animatedStyle]} />
    </GestureDetector>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <Ball />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  ball: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: "blue",
    opacity: 0.5,
  },
});
