import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  interpolate,
  interpolateColor,
} from "react-native-reanimated";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";

export default function App() {
  const progress = useSharedValue(100);

  const startAnimation = () => {
    progress.value = withTiming(
      progress.value + 100,
      { duration: 2000 },
      () => {
        progress.value = withSpring(100, {
          mass: 2.6,
          damping: 8,
          stiffness: 201,
        });
      }
    );
  };

  const transformEval = () => {
    "worklet";
    return interpolate(progress.value, [100, 200], [1, 3]);
  };

  const rstyle = useAnimatedStyle(() => ({
    borderRadius: progress.value - 100,
    transform: [
      { scale: transformEval() },
      { rotate: interpolate(progress.value, [100, 200], [0, 180]) + "deg" },
    ],
    opacity: interpolate(progress.value, [100, 200], [1, 0.3]),
    backgroundColor: interpolateColor(
      progress.value,
      [100, 150, 200],
      ["blue","yellow", "red"]
    ),
  }));

  return (
    <Pressable style={styles.container} onPress={startAnimation}>
      <Animated.View
        style={[
          {
            height: 100,
            width: 100,
            backgroundColor: "blue",
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
    marginVertical: 300,
  },
});
