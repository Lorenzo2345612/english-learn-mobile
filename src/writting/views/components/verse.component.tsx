import { View } from "react-native";
import { Hint, WrittingTestModel } from "../../models/writting.test.model";
import { StyleSheet, Text } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useHintContext } from "../../contexts/hints.context";

const getLevelColor = (level: number) => {
  switch (level) {
    case 0:
      return "green";
    case 1:
      return "orange";
    case 2:
      return "red";
    default:
      return "black";
  }
};

interface VerseComponentProps {
  question: WrittingTestModel;
}

const levels = new Map<number, string>([
  [0, "Easy"],
  [1, "Medium"],
  [2, "Hard"],
]);

interface TextWithHintsProps {
  text: string;
}

interface HintIndex {
  word: string;
  index: number;
}

export const TextWithHints = ({ text }: TextWithHintsProps) => {
  const { hints, useHint } = useHintContext();
  const [hintMap, setHintMap] = useState<Map<string, number>>(new Map());

  const splitText = useCallback(() => {
    const regex = /[\w'-]+|[.,!?;:"“”(){}\[\]]|\n/g;
    const matches = text.match(regex);
    return matches ?? [];
  }, [text]);

  useEffect(() => {
    // Reset the hints when the text changes
    const hintMap = new Map<string, number>();

    for (let i = 0; i < hints.length; i++) {
      const hint = hints[i];
      if (hint.word) {
        // Store the word and its index in the map
        hintMap.set(hint.word.toLowerCase(), i);
      }
    }
    setHintMap(hintMap);
  }, [hints, useHint]);

  return (
    <Text style={styles.songLyrics}>
      {splitText().map((word, index) => {
        const lowerWord = word.toLowerCase();
        const hintIndex = hintMap.get(lowerWord);
        if (hintIndex !== undefined) {
          return (
            <>
              <Text
                key={index * 2}
                style={styles.hintText}
                onPress={() => useHint(hintIndex)}
              >
                {word}
              </Text>
              <Text key={index * 2 + 1}>{word.includes("\n") ? "" : " "}</Text>
            </>
          );
        } else {
          return (
            <>
              <Text key={index * 2} style={{ color: "black" }}>
                {word}
              </Text>
              <Text key={index * 2 + 1}>{word.includes("\n") ? "" : " "}</Text>
            </>
          );
        }
      })}
    </Text>
  );
};

export const VerseComponent = ({ question }: VerseComponentProps) => {
  return (
    <>
      <Text style={styles.songTitle}>{question.title}</Text>
      <View style={styles.artistLevelView}>
        <Text style={styles.artistName}>{question.artist}</Text>
        <Text
          style={{
            ...styles.levelText,
            backgroundColor: getLevelColor(question.level),
          }}
        >
          {levels.get(question.level)}
        </Text>
      </View>
      <TextWithHints text={question.verse} />
    </>
  );
};

const styles = StyleSheet.create({
  songTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  artistLevelView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  artistName: {
    fontSize: 16,
    color: "gray",
  },
  levelText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
    height: 30,
    borderRadius: 15,
    backgroundColor: "green",
    paddingHorizontal: 15,
    textAlign: "center",
    verticalAlign: "middle",
  },
  songLyrics: {
    fontSize: 16,
    lineHeight: 30,
    letterSpacing: 0.5,
  },
  hintText: {
    color: "blue",
    textDecorationLine: "underline",
  },
});
