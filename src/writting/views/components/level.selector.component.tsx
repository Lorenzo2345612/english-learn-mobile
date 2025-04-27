import { Picker } from "@react-native-picker/picker";
import { StyleSheet, View } from "react-native";

const levels = [
  { label: "Random", value: 1, color: "black" },
  { label: "Easy", value: 2, color: "green" },
  { label: "Medium", value: 3, color: "orange" },
  { label: "Hard", value: 4, color: "red" },
];

interface LevelSelectorComponentProps {
  onLevelChange: (level: number) => void;
  selectedLevel: number;
}

export const LevelSelectorComponent = ({
  onLevelChange,
  selectedLevel,
}: LevelSelectorComponentProps) => {
  const handleLevelChange = (itemValue: number) => {
    console.log("Selected level:", itemValue);
    onLevelChange(itemValue);
  };
  const getColor = (level: number) => {
    const levelItem = levels.find((item) => item.value === level);
    return levelItem ? levelItem.color : "black";
  };

  const getSelectedIndex = () => {
    for (let i = 0; i < levels.length; i++) {
      if (levels[i].value === selectedLevel) {
        return i + 1;
      }
    }
    return 1;
  };

  return (
    <View style={styles.main}>
      <Picker
        mode="dropdown"
        itemStyle={styles.item}
        dropdownIconColor={"white"}
        style={{ backgroundColor: getColor(selectedLevel) }}
        selectedValue={getSelectedIndex()}
        onValueChange={handleLevelChange}
      >
        {levels.map((level) => (
          <Picker.Item
            key={level.value}
            label={level.label}
            value={level.value}
            style={{ ...styles.item, backgroundColor: level.color }}
          />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: 140,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "lightgray",
    justifyContent: "center",
  },
  item: {
    color: "white",
  },
});
