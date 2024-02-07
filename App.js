import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";

export default function App() {
  const progress = useSharedValue(100);

  useEffect(() => {
    progress.value = withRepeat(withTiming(progress.value + 100), 6, true);
  }, []);

  const rstyle = useAnimatedStyle(() => ({
    width: progress.value,
    borderRadius: progress.value - 100,
  }));

  return (
    <View style={styles.container}>
      <Animated.View
        style={[{
          height: 100,
          backgroundColor: "violet",
        }, rstyle]}
      />
    </View>
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
