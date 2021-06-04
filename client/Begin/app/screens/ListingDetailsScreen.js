import React from "react";
import { StyleSheet, View } from "react-native";
import CourseDetails from "../components/CourseDetails";
import ListItem from "../components/lists/ListItem";
import Screen from "../components/Screen";
import Text from "../components/Text";
import colors from "../config/colors";
import routes from "../navigation/routes";

function ListingDetailsScreen({ navigation, route }) {
  const listing = route.params;

  return (
    <Screen style={styles.screen}>
      <Text style={styles.title}>{listing.course_id}</Text>
      <Text style={styles.subTitle}>{listing.course_name}</Text>
      <View style={styles.userContainer}>
        <ListItem
          title="Data Analytics"
          subTitle="Recommendations"
          onPress={() => navigation.navigate(routes.DATA_ANALYSIS)}
        />
        <CourseDetails courseData={listing} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    marginVertical: 40,
    backgroundColor: colors.light,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  userContainer: {
    marginVertical: 40,
  },
});

export default ListingDetailsScreen;
