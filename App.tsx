import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import * as Updates from "expo-updates";

function Row({ label, value, error }: { label: string; value: string; error?: boolean }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, error && styles.errorText]}>{value}</Text>
    </View>
  );
}

export default function App() {
  const { isChecking, checkError, availableUpdate } = Updates.useUpdates();

  useEffect(() => {
    console.log("[updates] runtimeVersion:", Updates.runtimeVersion);
    console.log("[updates] channel:", Updates.channel);
    Updates.checkForUpdateAsync()
      .then((result) => console.log("[updates] check result:", JSON.stringify(result)))
      .catch((e) => console.log("[updates] check error:", e));
  }, []);

  useEffect(() => {
    console.log("[updates] state:", {
      isChecking,
      checkError: checkError?.message ?? null,
      availableUpdate: availableUpdate?.manifest?.id ?? null,
    });
  }, [isChecking, checkError, availableUpdate]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>expo-updates manifest check</Text>
      <Row label="Runtime version" value={Updates.runtimeVersion ?? "—"} />
      <Row label="Channel" value={Updates.channel ?? "—"} />
      <Row label="Checking" value={String(isChecking)} />
      <Row
        label="Update available"
        value={availableUpdate ? `yes — ${availableUpdate.manifest?.id ?? ""}` : "no"}
      />
      <Row
        label="Check error"
        value={checkError ? checkError.message : "none"}
        error={!!checkError}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 60, backgroundColor: "#fff" },
  heading: { fontSize: 16, fontWeight: "bold", marginBottom: 20, color: "#000" },
  row: {
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ddd",
  },
  label: { fontSize: 12, color: "#888", marginBottom: 4 },
  value: { fontSize: 15, color: "#000" },
  errorText: { color: "#dc2626" },
});
