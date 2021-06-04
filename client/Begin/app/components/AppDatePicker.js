//import DatePicker from the package we installed
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function AppDatePicker({ newDate }) {
  if (newDate == undefined) {
    console.log("Fuck");
    newDate = new Date(1598051730000);
  }
  const [date, setDate] = useState(newDate);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    console.log(currentDate);
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <DateTimePicker
        isVisible="false"
        testID="dateTimePicker"
        value={date}
        mode="date"
        is24Hour={true}
        display="default"
        onChange={onChange}
        style={{ width: 320, backgroundColor: "white" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
});
