import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Card from "../components/Card";
import colors from "../config/colors";
import routes from "../navigation/routes";

const objectToArray = (obj) => {
  const res = [];
  for (const p in obj) {
    const _o = obj[p];
    res.push(_o);
  }
  return res;
};

function CourseDetails({ navigation, courseData }) {
  const {
    course_id,
    course_name,
    desired_grade,
    expected_difficulty,
    time_spent,
  } = courseData;

  function helper(courseData) {
    for (var propName in courseData) {
      const propValue = courseData[propName];
      console.log(propName, propValue);
    }

    console.log("Barry: ", objectToArray(courseData.deliverables));
  }

  const deliverables = objectToArray(courseData.deliverables);
  return (
    <View style={styles.deliverablesContainer}>
      <Text style={{padding: 20}}>Click to Edit Deliverable Information</Text>
      <FlatList
        data={deliverables}
        keyExtractor={(deliverable) => deliverable.deliverable_name.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.deliverable_name}
            subTitle={item.due_at}
            onPress={() => navigation.navigate(routes.LISTING_EDIT, {type: "deliverable", courseId: course_id, val: item})}
          />
        )}
      />
      {/* <Button title="View Data" onPress={() => helper(courseData)} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  deliverablesContainer: {
    marginVertical: 20,
    backgroundColor: colors.white,
    height:350
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
});

export default CourseDetails;
