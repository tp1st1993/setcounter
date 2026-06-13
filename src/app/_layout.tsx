import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const STORAGE_KEY = "set-count";

export default function HomeScreen() {
  const [sets, setSets] = useState(0);

  useEffect(() => {
    const loadSets = async () => {
      const savedSets = await AsyncStorage.getItem(STORAGE_KEY);

      if (savedSets !== null) {
        setSets(Number(savedSets));
      }
    };

    loadSets();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, String(sets));
  }, [sets]);

  const addSet = () => {
    setSets((current) => current + 1);
  };

  const resetSets = () => {
    setSets(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>セット数</Text>

      <Pressable style={styles.bigButton} onPress={addSet}>
        <Text style={styles.count}>{sets}</Text>
      </Pressable>

      <Pressable style={styles.reset} onLongPress={resetSets}>
        <Text style={styles.resetText}>長押しでリセット</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: "#fff",
    fontSize: 28,
    marginBottom: 30,
  },
  bigButton: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
  },
  count: {
    color: "#fff",
    fontSize: 90,
    fontWeight: "bold",
  },
  reset: {
    marginTop: 40,
    padding: 20,
  },
  resetText: {
    color: "#fff",
    fontSize: 20,
  },
});