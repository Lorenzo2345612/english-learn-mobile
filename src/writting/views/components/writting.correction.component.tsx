import { Correction } from "@/src/common/models/review.response.model";
import { View, Text, StyleSheet, Dimensions } from "react-native";

interface CorrectionItemProps {
  correction: Correction;
}

const DEVICE_WIDTH = Dimensions.get("screen").width;

export const CorrectionItem = ({ correction }: CorrectionItemProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.grammarIssueText}>Grammar Issue</Text>
      <View style={{ flex: 1, padding: 10, justifyContent: "space-between" }}>
        <View style={{ gap: 5 }}>
          <Text style={{ ...styles.errorText, fontWeight: "300" }}>
            Issue:{" "}
          </Text>
          <Text style={styles.errorText}>{correction.error}</Text>
        </View>
        <View style={{ gap: 5 }}>
          <Text style={{ ...styles.errorText, fontWeight: "300" }}>
            Explanation:{" "}
          </Text>
          <Text>{correction.explanation}</Text>
        </View>
        <View
          style={{
            gap: 5,
            backgroundColor: "lightgreen",
            borderRadius: 5,
            padding: 10,
          }}
        >
          <Text
            style={{
              ...styles.errorText,
              fontWeight: "300",
              color: "forestgreen",
            }}
          >
            Solution:{" "}
          </Text>
          <Text style={styles.errorText}>{correction.solution}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: DEVICE_WIDTH - 100,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
  },
  grammarIssueText: {
    height: 50,
    width: "100%",
    backgroundColor: "black",
    display: "flex",
    verticalAlign: "middle",
    paddingLeft: 10,
    color: "white",
    fontWeight: "bold",
  },
  errorText: {
    color: "gray",
    fontWeight: "bold",
  },
});
