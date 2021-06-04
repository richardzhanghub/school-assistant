import React, { useEffect } from "react";
import { Button, FlatList, StyleSheet } from "react-native";
import coursesApi from "../api/courses";
import ActivityIndicator from "../components/ActivityIndicator";
import CourseCard from "../components/CourseCard";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import colors from "../config/colors";
import useApi from "../hooks/useApi";
import routes from "../navigation/routes";

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
    const courses = getCoursesApi.data.courses;
    console.log("raw data", courses);

    const cleanData = objectToArray(courses);
    console.log("clean data", cleanData);
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
          <CourseCard
            title={item.course_id}
            subTitle={item.course_name}
            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
          />
        )}
      />
      {/* <Button title="show data" onPress={helper} /> */}
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
