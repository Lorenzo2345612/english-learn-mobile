import {
  useGetWrittingTestViewModel,
  useManageWrittingTestViewModel,
  useReviewWrittingTestViewModel,
} from "../view_models/writting.test.view.model";
import {
  ActivityIndicator,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  View,
  Touchable,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { CorrectionItem } from "./components/writting.correction.component";
import { WrittingCorrectionInfo } from "./components/writting.correction.info";
import { ErrorView } from "@/src/common/views/error.view";
import { LoadingView } from "@/src/common/views/loading.view";
import { MaterialIcons } from "@expo/vector-icons";

export function WrittingTestView() {
  const {
    data: question,
    isLoading,
    error,
    retry,
  } = useGetWrittingTestViewModel();
  const { answer, setAnswer } = useManageWrittingTestViewModel();
  const {
    review,
    handleSubmit: submitReview,
    isPending: isReviewing,
    error: reviewError,
    cleanReview,
  } = useReviewWrittingTestViewModel();

  if (isLoading) {
    return <LoadingView />;
  }

  if (error || reviewError) {
    return <ErrorView retry={retry} />;
  }

  const handleSubmit = () => {
    if (!question || answer.trim() === "") {
      return;
    }
    submitReview({
      verseId: question.verseId,
      translation: answer,
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.innerContainer}
    >
      <Text style={styles.writtingTestText}>Writting Test</Text>

      <TouchableOpacity
        onPress={() => {
          setAnswer("");
          cleanReview();
          retry();
        }}
        style={styles.nextButton}
      >
        <Text style={styles.nextButtonText}>Next</Text>
        <MaterialIcons name="navigate-next" size={24} color="white" />
      </TouchableOpacity>

      <Text style={styles.songTitle}>{question?.title}</Text>
      <Text style={styles.artistName}>{question?.artist}</Text>
      <Text style={styles.songLyrics}>{question?.verse}</Text>

      <TextInput
        style={styles.answerInput}
        placeholder="Write your answer here"
        multiline
        numberOfLines={5}
        onChange={(e) => setAnswer(e.nativeEvent.text)}
        value={answer}
      />

      <TouchableOpacity
        onPress={handleSubmit}
        disabled={isReviewing}
        style={styles.submitButton}
      >
        {isReviewing ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.submitButtonText}>
            {review ? "Retry" : "Submit"}
          </Text>
        )}
      </TouchableOpacity>

      {review && <WrittingCorrectionInfo review={review} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 30,
  },
  innerContainer: {
    gap: 10,
    padding: 20,
  },
  writtingTestText: {
    fontSize: 26,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 22,
  },
  songTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  artistName: {
    fontSize: 16,
    marginBottom: 10,
    color: "gray",
  },
  songLyrics: {
    fontSize: 16,
    lineHeight: 24,
  },
  answerInput: {
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 5,
    height: 100,
  },

  submitButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
  },
  nextButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 20,
    height: 40,
    alignItems: "center",
    width: 100,
    alignSelf: "flex-end",
    flexDirection: "row",
    justifyContent: "center",
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
  },
});
