import { View } from "react-native";
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
    const lowercasedText = START + text.toLowerCase();
    const hintWords = [...hintMap.keys()].sort((a, b) => b.length - a.length);

    const regex = new RegExp(`\\b(${hintWords.join("|")})\\b`, "g");
    const replacedText = lowercasedText.replaceAll(
      regex,
      (match) => `__${match}__`
    );

    /*     let match;

    while ((match = regex.exec(lowercasedText)) !== null) {
      console.log("match", match.index);
    } */

    const matches = lowercasedText.match(regex) || [];
    const textParts = replacedText.split(/__.*?__/);

    console.log("matches", matches[0]);

    const result: string[] = [];
    let partIndex = 0,
      matchIndex = 0;

    while (partIndex < textParts.length || matchIndex < matches.length) {
      if (partIndex < textParts.length) {
        result.push(textParts[partIndex]);
        partIndex++;
      }
      if (matchIndex < matches.length) {
        result.push(matches[matchIndex]);
        matchIndex++;
      }
    }

    if (result[0]?.startsWith(START)) {
      result[0] = result[0].replace(START, "");
    }

    if (result[0] === "") {
      result.shift();
    }

    setSplittedText(result);
  }, [text, hintMap]);

  return (
    <Text style={styles.songLyrics}>
      {splittedText.map((word, index) => {
        const lowerWord = word.toLowerCase();
        const hintIndex = hintMap.get(lowerWord);
        if (hintIndex !== undefined) {
          return (
            <Text
              key={index}
              style={styles.hintText}
              onPress={() => useHint(hintIndex)}
            >
              {word}
            </Text>
          );
        } else {
          return (
            <Text key={index} style={{ color: "black" }}>
              {word}
            </Text>
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
