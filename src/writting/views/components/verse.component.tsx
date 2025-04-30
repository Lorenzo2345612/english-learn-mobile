import { Pressable, View } from "react-native";
import { Hint, WrittingTestModel } from "../../models/writting.test.model";
import { StyleSheet, Text } from "react-native";
import { useCallback, useEffect, useMemo, useState } from "react";
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
  const [splittedText, setSplittedText] = useState<string[]>([]);

  // Precalcular el mapa de hints usando useMemo
  const hintMap = useMemo(() => {
    const map = new Map<string, number>();
    hints.forEach((hint, index) => {
      if (hint.word) {
        map.set(hint.word.toLowerCase(), index);
      }
    });
    console.log(hints);

    return map;
  }, [hints]);

  useEffect(() => {
    if (!text) {
      setSplittedText([]);
      return;
    }

    if (hints.length === 0) {
      setSplittedText([text]);
      return;
    }

    const START = "0b9d42a9-af4a-4721-879a-66569df3d7ec ";
    const prefixedText = START + text;

    const lowercasedText = prefixedText.toLowerCase();
    const hintWords = [...hintMap.keys()].sort((a, b) => b.length - a.length);

    const regex = new RegExp(
      `(?<!\\w|')(${hintWords.join("|")})(?!\\w|')`,
      "g"
    );

    // Separate the matches from the text
    const matches: string[] = [];
    const textParts: string[] = [];

    let match;
    let lastIndex = 0;
    while ((match = regex.exec(lowercasedText)) !== null) {
      const startIndex = match.index;
      const endIndex = match.index + match[0].length;

      // Add the text before the match
      const beforeMatch = prefixedText.substring(lastIndex, startIndex);

      const splittedBefore = beforeMatch.split("\n");
      if (splittedBefore.length > 1) {
        for (let i = 0; i < splittedBefore.length - 1; i++) {
          textParts.push(splittedBefore[i]);
          textParts.push("\n");
        }
        const lastPart = splittedBefore[splittedBefore.length - 1];
        if (lastPart !== "") {
          textParts.push(lastPart);
        }
      } else {
        textParts.push(beforeMatch);
      }
      // Add the matched word
      const matchedWord = prefixedText.substring(startIndex, endIndex);
      textParts.push(matchedWord);

      console.log(
        `bf[${beforeMatch}] rmw[${match[0]}] mw[${matchedWord}] si[${startIndex}] ei[${endIndex}]`
      );
      lastIndex = endIndex;
    }

    if (lastIndex < lowercasedText.length) {
      textParts.push(text.substring(lastIndex));
    }

    textParts[0] = textParts[0].replace(START, "");
    if (textParts[0] === "") {
      textParts.shift();
    }

    console.log("matches", matches[0]);

    setSplittedText(textParts);
  }, [text, hintMap]);

  return (
    <Text style={styles.songLyrics}>
      {splittedText.map((word, index) => {
        const lowerWord = word.toLowerCase();
        const hintIndex = hintMap.get(lowerWord);
        if (hintIndex !== undefined) {
          return (
            <Pressable
              key={`hint-${index}`}
              onPress={() => {
                useHint(hintIndex);
              }}
              style={styles.hintPressable}
            >
              <Text key={`txt-${index}`} style={styles.hintText}>
                {word}
              </Text>
            </Pressable>
          );
        } else {
          return word.includes("\n") ? (
            <Text key={`txt-${index}`} style={styles.unhintedText}>
              {word}
            </Text>
          ) : (
            <Pressable key={`unhint-${index}`} style={styles.unhintPressable}>
              <Text key={`txt-${index}`} style={styles.unhintedText}>
                {word}
              </Text>
            </Pressable>
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
  },
  hintText: {
    color: "white",
    fontSize: 16,
  },
  unhintedText: {
    color: "black",
    textAlignVertical: "top",
    fontSize: 16,
  },
  hintPressable: {
    backgroundColor: "blue",
    borderRadius: 5,
    paddingVertical: 1,
    paddingHorizontal: 2,
  },
  unhintPressable: {
    paddingVertical: 1,
    paddingHorizontal: 2,
  },
});
