import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Updates from "expo-updates";
import Constants from "expo-constants";

export default function App() {
  const [status, setStatus] = useState("pending…");

  useEffect(() => {
    const url = Constants.expoConfig?.updates?.url;
    if (!url) {
      setStatus("no updates.url in config");
      return;
    }

    fetch(url, {
      headers: {
        Accept: "multipart/mixed,application/expo+json,application/json",
        "expo-channel-name": Updates.channel ?? "",
        "Expo-Platform": "ios",
        "Expo-Protocol-Version": "1",
        "Expo-API-Version": "1",
        "Expo-Updates-Environment": "BARE",
        "Expo-Runtime-Version": Updates.runtimeVersion ?? "",
      },
    })
      .then((r) => {
        const msg = `HTTP ${r.status}`;
        console.log("[repro] fetch result:", msg);
        setStatus(msg);
      })
      .catch((e: unknown) => {
        const msg = `Error: ${e instanceof Error ? e.message : String(e)}`;
        console.log("[repro] fetch error:", msg);
        setStatus(msg);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>u.expo.dev fetch result</Text>
      <Text style={styles.status}>{status}</Text>
      <Text style={styles.meta}>
        channel: {Updates.channel ?? "—"}{"\n"}
        runtimeVersion: {Updates.runtimeVersion ?? "—"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24, backgroundColor: "#fff" },
  label: { fontSize: 14, color: "#666", marginBottom: 12 },
  status: { fontSize: 40, fontWeight: "bold", color: "#000", marginBottom: 24 },
  meta: { fontSize: 12, color: "#999", textAlign: "center", lineHeight: 20 },
});
