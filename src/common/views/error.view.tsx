import { AntDesign } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
} from "react-native";

interface ErrorViewProps {
  retry: () => void;
}

export const ErrorView = ({ retry }: ErrorViewProps) => {
  return (
    <View style={styles.mainContainer}>
      <AntDesign name="exclamationcircleo" size={40} color="red" />
      <Text style={styles.errorText}>Oops! Something went wrong.</Text>
      <Text style={styles.errorText}>The server could be down.</Text>
      <TouchableOpacity onPress={retry} style={styles.retryButton}>
        <AntDesign name="reload1" size={15} color="white" />
        <Text style={{ fontSize: 15, color: "white" }}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  retryButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 10,
  },
  errorText: {
    fontSize: 16,
  },
});
