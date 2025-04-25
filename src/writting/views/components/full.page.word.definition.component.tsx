import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useHintContext } from "../../contexts/hints.context";
import { AntDesign } from "@expo/vector-icons";

export const FullPageWordDefinitionComponent = () => {
  const { currentHint, resetCurrentHint } = useHintContext();

  return (
    <View style={styles.container}>
      <View style={styles.innerModal}>
        <Text style={styles.mainWordText}>{currentHint?.word}</Text>
        <Text style={styles.definitionText}>{currentHint?.definition}</Text>
        <Text style={styles.exampleText}>{currentHint?.example}</Text>
        {currentHint?.relatedWords && currentHint.relatedWords.length > 0 && (
          <Text style={styles.relatedWordsText}>
            Related Words: {currentHint.relatedWords.join(", ")}
          </Text>
        )}
        <TouchableOpacity style={styles.closeButton} onPress={resetCurrentHint}>
          <AntDesign name="close" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  innerModal: {
    width: "70%",
    aspectRatio: 1,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    paddingTop: 40,
    display: "flex",
    justifyContent: "space-between",
  },
  mainWordText: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  definitionText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    flex: 2,
  },
  exampleText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    fontStyle: "italic",
    flex: 1,
    color: "gray",
    textDecorationLine: "underline",
  },
  relatedWordsText: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
    fontStyle: "italic",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    height: 40,
    width: 40,
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
