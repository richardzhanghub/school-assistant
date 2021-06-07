import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import coursesApi from "../api/courses";
import GoalChart from "../components/charts/GoalChart";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import util from "../utility/helper";
export default function ProgressDetailScreen({ navigation, route }) {
  const userData = route.params;
  // console.log("userData", userData);
  const getCoursesApi = useApi(coursesApi.getCourses);

  const testGetCourses = async () => {
    return await coursesApi.getCourses();
  };

  function getSchedule(userData) {
    return util.getScheduleForProgressVisual(userData);
  }

  function getData(userData) {
    return util.getDataForProgressVisual(userData);
  }

  useEffect(() => {}, []);

  const schedule1 = {
    ends_at: "2000-01-23T00:00:00Z",
    starts_at: "2000-01-23T00:00:00Z",
    time_allocations: {
      ECE101: 8,
      ECE255: 7,
      ECE250: 8,
      ECE499: 9,
    },
  };

  return (
    <Screen>
      <View style={styles.title}>
        <AppText style={styles.bold}>Current Schedule: </AppText>
        <AppText>
          {" " + util.formatDate(getSchedule(userData).starts_at) + " "}
        </AppText>
        <AppText>-</AppText>
        <AppText>
          {" " + util.formatDate(getSchedule(userData).ends_at)}
        </AppText>
      </View>
      <View style={styles.chart}>
        <GoalChart
          courses={getData(userData)}
          schedule={getSchedule(userData)}
          startRange={new Date(getSchedule(userData).starts_at).toISOString()}
          endRange={new Date(getSchedule(userData).ends_at).toISOString()}
        />
      </View>
      {/* <Button title="test" onPress={myFxn} /> */}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    flexWrap: "wrap",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    padding: 10,
  },

  bold: {
    fontWeight: "bold",
    fontSize: 18,
  },

  chart: {
    marginTop: 40,
    marginLeft: 5,
    justifyContent: "center",
    // backgroundColor: colors.light,
  },
});
