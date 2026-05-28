import "expo-dev-client";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  const [result, setResult] = useState("Fetching...");

  useEffect(() => {
    fetch("https://u.expo.dev/20a55a8d-ba63-4cd7-a840-ba2658972366", {
      headers: {
        Accept: "multipart/mixed,application/expo+json,application/json",
        "expo-channel-name": "production",
        "Expo-Platform": "ios",
        "Expo-Protocol-Version": "1",
        "Expo-API-Version": "1",
        "Expo-Updates-Environment": "BARE",
        "Expo-Runtime-Version": "1.0.0",
      },
    })
      .then((r) => {
        const msg = `HTTP ${r.status}`;
        console.log("[repro]", msg);
        setResult(msg);
      })
      .catch((e: unknown) => {
        const msg = `Error: ${e instanceof Error ? e.message : String(e)}`;
        console.log("[repro]", msg);
        setResult(msg);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>GET u.expo.dev result:</Text>
      <Text style={styles.result}>{result}</Text>
      <Text style={styles.note}>
        Expected: 200 or 400 (reaches EAS server){"\n"}
        Actual on standalone iOS build: 403 (Cloudflare blocks NSURLSession)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  label: { fontSize: 14, color: "#666", marginBottom: 8 },
  result: { fontSize: 32, fontWeight: "bold", marginBottom: 24, color: "#000" },
  note: { fontSize: 12, color: "#999", textAlign: "center", lineHeight: 20 },
});
