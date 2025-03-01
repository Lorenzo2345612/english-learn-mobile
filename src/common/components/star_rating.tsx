import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface StarRatingProps {
  rating: number;
  size?: number;
  withRating?: boolean;
  onRatingChange?: (rating: number) => void;
}

export const StarRating = ({
  rating,
  onRatingChange,
  size,
  withRating,
}: StarRatingProps) => {
  const handleStarPress = (star: number) => {
    if (onRatingChange) {
      onRatingChange(star);
    }
  };

  const formatRating = (rating: number) => {
    return rating.toFixed(1);
  };

  const checkRating = (star: number) => {
    if (rating >= star) {
      return "star";
    } else if (rating >= star - 0.5) {
      return "star-half";
    }
    return "star-border";
  };
  return (
    <View style={styles.mainContainer}>
      {withRating && (
        <Text style={styles.ratingText}>{formatRating(rating)}</Text>
      )}
      <View style={styles.container}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => handleStarPress(star)}
            style={styles.starContainer}
          >
            <MaterialIcons
              name={checkRating(star)}
              size={size || 24}
              color="gold"
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  starContainer: {
    marginHorizontal: 5,
  },
  ratingText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "dimgray",
    marginBottom: 10,
  },
});
