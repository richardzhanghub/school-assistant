import React, { useState } from "react";
import {StyleSheet, Text, View, TouchableOpacity } from "react-native";
import ListEditCourse from "../components/forms/ListEditCourse";
import ListEditDeliverable from "../components/forms/ListEditDeliverable";
import colors from "../config/colors";
import Screen from "../components/Screen";

const ListingEditScreen = ({navigation, route}) => {
  const type = route.params.type
  return (
    <Screen style={styles.container}>
      { type == "course" ? <ListEditCourse navigation={navigation} course={route.params.val}/> :
        type == "deliverable" ? <ListEditDeliverable navigation={navigation} courseId={route.params.courseId} deliverable={route.params.val}/> : ""}
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
