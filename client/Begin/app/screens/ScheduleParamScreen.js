import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";
import scheduleApi from "../api/schedule";
import AppButton from "../components/Button";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import colors from "../config/colors";
import defaultStyles from "../config/styles";
import routes from "../navigation/routes";
export default function ScheduleParam({ navigation }) {
  const [startPickerShow, setStartPickerShow] = useState(false);
  const [endPickerShow, setEndPickerShow] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [maxHour, setMaxHour] = useState(0);

  const handleSubmit = async ({ username, password }) => {
    const result = await authAPI.login(username, password);

    if (!result.ok) {
      console.log("NOT OK");
      return setLoginFailed(true);
    }

    setLoginFailed(false);
    login(result.data.access_token);
  };

  const getSchedule = async () => {
    const newSchedule = {
      starts_at: startDate,
      ends_at: endDate,
      max_study_hours: maxHour,
    };

    console.log("client: newSchedule", newSchedule);
    const result = await scheduleApi.getSchedule(newSchedule);
    if (!result.ok) {
      console.log("NOT OK");
    } else {
      console.log("Success!!");
      const schedule_status = "new";
      navigation.navigate(routes.PROGRESS_DETAILS, schedule_status);
    }
  };

  const showStartPicker = () => {
    setStartPickerShow(true);
  };

  const showEndPicker = () => {
    setEndPickerShow(true);
  };

  const onStartDateConfirm = () => {
    setStartDate(startDate);
    setStartPickerShow(false);
  };

  const onEndDateConfirm = () => {
    setEndDate(endDate);
    setEndPickerShow(false);
  };

  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    console.log(startDate);
    setStartDate(currentDate);
  };

  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    console.log(endDate);
    setEndDate(currentDate);
  };

  const onMaxHourChange = (maxHour) => {
    console.log("maxHour +++", maxHour);
    setMaxHour(maxHour);
  };

  return (
    <Screen>
      <ScrollView>
        <AppText>Start From</AppText>
        <TouchableHighlight onPress={showStartPicker}>
          <AppText style={styles.myTextInput}>{startDate.toString()}</AppText>
        </TouchableHighlight>

        {startPickerShow && (
          <View style={styles.datePickerContainer}>
            <DateTimePicker
              isVisible="false"
              testID="startDateTimePicker"
              value={startDate}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onStartDateChange}
              style={{ width: 320, backgroundColor: "white" }}
            />
          </View>
        )}
        {startPickerShow && (
          <Button title="Confirm" onPress={onStartDateConfirm} />
        )}

        <AppText>End At</AppText>
        <TouchableHighlight onPress={showEndPicker}>
          <AppText style={styles.myTextInput}>{endDate.toString()}</AppText>
        </TouchableHighlight>
        {endPickerShow && (
          <View style={styles.datePickerContainer}>
            <DateTimePicker
              isVisible="false"
              testID="endDateTimePicker"
              value={endDate}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onEndDateChange}
              style={{ width: 320, backgroundColor: "white" }}
            />
          </View>
        )}
        {endPickerShow && <Button title="Confirm" onPress={onEndDateConfirm} />}

        <TextInput
          onChangeText={(text) => setMaxHour(text)}
          placeholder="Max Hour"
          keyboardType="numeric"
          style={{
            fontSize: 14,
            margin: 10,
            borderBottomColor: "#ccc",
            backgroundColor: defaultStyles.colors.light,
            borderRadius: 25,
            flexDirection: "row",
            padding: 15,
            marginVertical: 10,
          }}
        />
        <AppButton
          title="Submit"
          // onPress={() => navigation.navigate(routes.PROGRESS_DETAILS)}
          onPress={getSchedule}
        />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  myTextInput: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
    color: colors.dark,
    fontSize: 18,
  },
  datePickerContainer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
});
