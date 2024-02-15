import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

function Ball() {
  const isPressed = useSharedValue(false);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: isPressed.value ? 1.3 : 1 }],
    opacity: isPressed.value ? 1 : 0.5,
  }));

  const pan = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = true;
    })
    .onFinalize(() => (isPressed.value = false));
  return (
    <GestureDetector gesture={pan}>
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
  },
});
