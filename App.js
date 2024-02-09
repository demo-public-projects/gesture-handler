import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSpring,
  runOnJS,
  runOnUI,
} from "react-native-reanimated";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { useState } from "react";

export default function App() {
  const progress = useSharedValue(100);
  const [finished, setFinished] = useState(false);

  const startAnimation = () => {
    progress.value = withTiming(
      progress.value + 100,
      { duration: 2000 },
      () => {
        progress.value = withSpring(
          100,
          {
            mass: 2.6,
            damping: 8,
            stiffness: 201,
          },
          () => runOnJS(setFinished)(true)
        );
      }
    );
  };

  const transformEval = () => {
    "worklet";
    return progress.value / 100;
  };

  const onButtonPress = () => {
    runOnUI(() => {
      const evalResult = transformEval();
      console.log(evalResult);
    })();
  };

  const rstyle = useAnimatedStyle(() => ({
    borderRadius: progress.value - 100,
    transform: [{ scale: transformEval() }],
  }));

  return (
    <Pressable style={styles.container} onPress={startAnimation}>
      <Animated.View
        style={[
          {
            height: 100,
            width: 100,
            backgroundColor: "violet",
          },
          rstyle,
        ]}
      />
      {finished && <Text>Finished!</Text>}
      <Button title="Click Me" onPress={onButtonPress} />
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
