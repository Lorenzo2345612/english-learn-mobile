import { ActivityIndicator, View } from "react-native";

export const LoadingView = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size={36} />
    </View>
  );
};
