import React, { useState } from "react";
import {StyleSheet, Text, View, TouchableOpacity } from "react-native";
import * as Yup from "yup";
import listingsApi from "../api/listings";
import CategoryPickerItem from "../components/CategoryPickerItem";
import ListEdit from "../components/forms/ListEdit"
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

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please select at least one image."),
});

const categories = [
  {
    backgroundColor: "#fc5c65",
    icon: "floor-lamp",
    label: "Furniture",
    value: 1,
  },
  {
    backgroundColor: "#fd9644",
    icon: "car",
    label: "Cars",
    value: 2,
  },
  {
    backgroundColor: "#fed330",
    icon: "camera",
    label: "Cameras",
    value: 3,
  },
  {
    backgroundColor: "#26de81",
    icon: "cards",
    label: "Games",
    value: 4,
  },
  {
    backgroundColor: "#2bcbba",
    icon: "shoe-heel",
    label: "Clothing",
    value: 5,
  },
  {
    backgroundColor: "#45aaf2",
    icon: "basketball",
    label: "Sports",
    value: 6,
  },
  {
    backgroundColor: "#4b7bec",
    icon: "headphones",
    label: "Movies & Music",
    value: 7,
  },
  {
    backgroundColor: "#a55eea",
    icon: "book-open-variant",
    label: "Books",
    value: 8,
  },
  {
    backgroundColor: "#778ca3",
    icon: "application",
    label: "Other",
    value: 9,
  },
];

const ListingEditScreen = () => {
  const [selectedType, setSelectedType] = useState('timeSpent');
  const location = useLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

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
      { selectedType && <ListEdit form={selectedType}/> }
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
export default ListingEditScreen;
