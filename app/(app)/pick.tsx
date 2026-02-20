import { Button, Screen, Title } from "@/components/ui";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";

const COLORS = [
  "#F87171",
  "#FB923C",
  "#FBBF24",
  "#34D399",
  "#22D3EE",
  "#60A5FA",
  "#818CF8",
  "#A78BFA",
  "#E879F9",
  "#F472B6",
];

export default function Pick() {
  const { user } = useAuth();
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  const handleUpdate = async () => {
    if (!selected) return Alert.alert("Selection Required", "Please pick a color.");

    const { error } = await supabase
      .from("users")
      .update({ current_color: selected })
      .eq("id", user?.id);

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert("Success", "Your profile color has been updated!", [
        {
          text: "OK",
          onPress: () => {
            router.dismissAll();
          },
        },
      ]);
    }
  };

  return (
    <Screen>
      <Title style={styles.centerText}>Pick a color!</Title>

      <View style={styles.grid}>
        {COLORS.map((color) => (
          <TouchableOpacity
            key={color}
            activeOpacity={0.7}
            style={[
              styles.circle,
              { backgroundColor: color },
              selected === color && styles.selectedCircle,
            ]}
            onPress={() => setSelected(color)}
          />
        ))}
      </View>

      <Button title="Save Color" onPress={handleUpdate} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  centerText: {
    textAlign: "center",
    marginBottom: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "center",
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  circle: {
    width: 55,
    height: 55,
    borderRadius: 28,
  },
  selectedCircle: {
    borderWidth: 3,
    borderColor: "#000",
    transform: [{ scale: 1.1 }], // Slight pop effect when selected
  },
});
