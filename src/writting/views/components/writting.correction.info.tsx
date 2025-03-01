import { ReviewResponse } from "@/src/common/models/review.response.model";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { CorrectionItem } from "./writting.correction.component";
import { StarRating } from "@/src/common/components/star_rating";
import { MaterialIcons } from "@expo/vector-icons";

interface WrittingCorrectionInfoProps {
  review: ReviewResponse;
}

export const WrittingCorrectionInfo = ({
  review,
}: WrittingCorrectionInfoProps) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.reviewText}>Review</Text>
      <Text style={styles.versionText}>
        User Version:{" "}
        <Text style={{ fontWeight: "normal" }}>{review.user_version}</Text>
      </Text>
      <Text style={styles.versionText}>
        Corrected Version:{" "}
        <Text style={{ fontWeight: "normal" }}>{review.corrected_version}</Text>
      </Text>
      {review.corrections.length > 0 && (
        <View>
          <Text style={styles.reviewText}>Corrections</Text>
          <FlatList
            data={review.corrections}
            horizontal
            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
            renderItem={({ item }) => <CorrectionItem correction={item} />}
            keyExtractor={(_, index) => `correction-${index}`}
          />
        </View>
      )}

      {review.topics_to_review.length > 0 && (
        <Text style={styles.reviewText}>Topics to Review</Text>
      )}
      {review.topics_to_review.map((topic, index) => (
        <View
          key={index}
          style={{
            flexDirection: "row",
            alignItems: "center",
            height: 30,
            gap: 5,
          }}
        >
          <MaterialIcons name="brightness-1" size={12} color="dimgray" />
          <Text style={styles.topicToReviewTextItem}>{topic}</Text>
        </View>
      ))}
      <Text style={styles.reviewText}>Rating</Text>
      <StarRating rating={review.accuracy * 5} size={36} withRating />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
    gap: 5,
  },
  reviewText: {
    fontSize: 20,
    alignSelf: "center",
    fontWeight: "bold",
    marginBottom: 10,
    color: "dimgray",
  },
  versionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "dimgray",
    marginBottom: 10,
  },
  topicToReviewTextItem: {
    fontSize: 16,
    color: "dimgray",
    verticalAlign: "middle",
  },
});
