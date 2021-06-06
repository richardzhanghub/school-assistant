import React, { useState } from "react";
import {StyleSheet, Text, View, TouchableOpacity } from "react-native";
import * as Yup from "yup";
import listingsApi from "../api/listings";
import CategoryPickerItem from "../components/CategoryPickerItem";
import ListAdd from "../components/forms/ListAdd"
import Button from "../components/Button";
import colors from "../config/colors";

import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import Screen from "../components/Screen";
import useLocation from "../hooks/useLocation";

const ListingAddScreen = () => {
  const [selectedType, setSelectedType] = useState('timeSpent');

  return (
    <Screen style={styles.container}>
      <View style={{flexDirection:"row"}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setSelectedType('timeSpent')}
        >
          <Text style={styles.text}>Time Spent</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setSelectedType('course')}
        >
          <Text style={styles.text}>Course</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setSelectedType('deliverable')}
        >
          <Text style={styles.text}>Deliverable</Text>
        </TouchableOpacity>
      </View>
      { selectedType && <ListAdd form={selectedType}/> }
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    margin: 2,
    width:"32%"
  },
  text: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "bold",
  },
});
export default ListingAddScreen;
