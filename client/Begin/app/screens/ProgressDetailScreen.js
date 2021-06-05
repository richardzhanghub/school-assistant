import { View } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import Screen from "../components/Screen";
import AppText from "../components/Text";

export default function ProgressDetailScreen(schedule_status) {
  const displayTitle = () => {
    if (schedule_status === "new") {
      return <AppText>New Schedule</AppText>;
    } else {
      return <AppText>Current Progress</AppText>;
    }
  };
  return (
    <Screen>
      {/* {() => displayTitle()} */}
      {/* <Text>Progress Details {schedule_status}</Text> */}
      <View style={styles.title}>
        <AppText>Current Progress</AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    flex: 1,
    marginTop: 15,
    // justifyContent: "center",
    alignItems: "center",
  },
});
