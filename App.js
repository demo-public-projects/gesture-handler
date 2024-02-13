import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  interpolate,
  interpolateColor,
  withRepeat,
  useAnimatedProps,
} from "react-native-reanimated";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { Ellipse } from "react-native-svg";

const AnimatedEllipse = Animated.createAnimatedComponent(Ellipse);

const radius = 40;

export default function App() {
  const distortion = useSharedValue(-10);
  const animatedProps = useAnimatedProps(() => ({
    rx: radius - distortion.value,
    ry: radius + distortion.value,
  }));

  const startAnimation = () => {
    distortion.value = withRepeat(withTiming(10, { duration: 100 }), 2, true);
  };

  return (
    <Pressable style={styles.container} onPress={startAnimation}>
      <Svg viewBox="0 0 150 150" height="300" width="300">
        <AnimatedEllipse
          cx="75"
          cy="75"
          animatedProps={animatedProps}
          // rx="50"
          // ry="30"
          stroke="lightblue"
          strokeWidth="10"
          fill="white"
        />
      </Svg>
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
