import React from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import CourseDetails from "../components/CourseDetails";
import ListItem from "../components/lists/ListItem";
import Screen from "../components/Screen";
import Text from "../components/Text";
import colors from "../config/colors";
import routes from "../navigation/routes";
// import coursesApi from "../api/courses";

function ListingDetailsScreen({ navigation, route }) {
  const listing = route.params;
  return (
    <Screen style={styles.screen}>
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={styles.title}>{listing.course_id}</Text>
        <Text style={styles.subTitle}>{listing.course_name}</Text>
        <View style={{ flexDirection: "row" }}>
          <View>
            <Text style={{ color: colors.primary }}>
              Expected Difficulty Level: {listing.expected_difficulty}
            </Text>
            <Text style={{ color: colors.primary }}>
              Desired Grade: {listing.desired_grade}%
            </Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate(routes.LISTING_EDIT, {
                type: "course",
                val: listing,
              })
            }
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.userContainer}>
          <ListItem
            title="Data Analytics"
            subTitle="Recommendations"
            onPress={() => navigation.navigate(routes.DATA_ANALYSIS)}
          />
          <CourseDetails navigation={navigation} courseData={listing} />
        </View>
      </SafeAreaView>
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
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  userContainer: {
    marginVertical: 40,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    marginLeft: 50,
    width: "22%",
  },
  buttonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default ListingDetailsScreen;
