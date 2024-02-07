import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSpring,
} from "react-native-reanimated";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";

export default function App() {
  const progress = useSharedValue(100);

  const startAnimation = () => {
    progress.value = withTiming(
      progress.value + 100,
      { duration: 2000 },
      () => {progress.value = withSpring(100, {
        mass: 2.6,
        damping: 8,
        stiffness: 201,
      });}
    );
  };

  const rstyle = useAnimatedStyle(() => ({
    width: progress.value,
    borderRadius: progress.value - 100,
    transform: [{ translateX: progress.value * 2 - 300 }],
  }));

  return (
    <Pressable style={styles.container} onPress={startAnimation}>
      <Animated.View
        style={[
          {
            height: 100,
            backgroundColor: "violet",
          },
          rstyle,
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
