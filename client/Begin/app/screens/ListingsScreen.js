import React, { useEffect } from "react";
import { Button, FlatList, StyleSheet } from "react-native";
import coursesApi from "../api/courses";
import timespentApi from "../api/timespent";
import ActivityIndicator from "../components/ActivityIndicator";
import Card from "../components/Card";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import colors from "../config/colors";
import useApi from "../hooks/useApi";
import routes from "../navigation/routes";
import util from "../utility/helper";

function ListingsScreen({ navigation }) {
  // not calling the function but just passing the reference
  // the actual api call is in useApi
  // const getListingsApi = useApi(listingsApi.getListings);

  const getCoursesApi = useApi(coursesApi.getCourses);
  // useEffect(() => {
  //   // ***the real api entry point
  //   getListingsApi.request();
  // }, []);

  useEffect(() => {
    getCoursesApi.request();
  }, []);

  const helper = async () => {
    const courses = getCoursesApi.data;
    // const courses = getCoursesApi.data.courses;
    console.log("raw data", courses);

    const cleanData = objectToArray(courses);
    console.log("clean data", cleanData);
  };

  const addTimeSpent = () => {
    const newTimeSpent = {
      ended_at: util.convertDateToString(new Date()),
      notes: "New Notes 2123",
      started_at: util.convertDateToString(new Date()),
    };

    timespentApi.addTimeSpent("ECE_250", newTimeSpent);
  };

  function objectToArray(obj) {
    const res = [];
    for (const p in obj) {
      const _o = obj[p];
      res.push(_o);
    }

    return res;
  }

  function getFirstPropName(obj) {
    const fisrtPropName = Object.keys(obj)[0];
    return fisrtPropName;
  }

  const newCourse = {
    courseName: "barry",
    courseNumber: "123",
    difficulty: "1",
    grade: "12",
  };
  return (
    <Screen style={styles.screen}>
      {getCoursesApi.error && (
        <>
          <AppText>Couldn't retrieve the listings.</AppText>
          <Button title="Retry" onPress={getCoursesApi.request} />
        </>
      )}
      <ActivityIndicator visible={getCoursesApi.loading} />

      <FlatList
        data={objectToArray(getCoursesApi.data.courses)}
        keyExtractor={(course) => course.course_id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.course_id}
            subTitle={item.course_name}
            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
          />
        )}
      />
      <Button title="show data" onPress={() => addTimeSpent()} />
      <Button
        title="View Schedule"
        onPress={() => navigation.navigate(routes.SCHEDULE_PARAM)}
      />
    </Screen>
    // <Screen>
    //   <Button title="show data" onPress={helper} />
    // </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default ListingsScreen;
