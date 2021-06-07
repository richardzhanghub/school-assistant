import React from "react";
import { StyleSheet } from "react-native";
import PieChart from "../components/charts/PieChart";
import WeeklyChart from "../components/charts/WeeklyChart";
import Screen from "../components/Screen";
import AppText from "../components/Text";

function DataAnalysisScreen(props) {
  return (
    <Screen>
      <AppText>Data Analysis Screen!</AppText>

      <PieChart
        courses={[
          {
            course_id: "ece123",
            time_spent: [
              {
                ended_at: "2021-03-16T05:31:57.775Z",
                notes: "Notes 123",
                started_at: "2021-03-16T03:31:20.176Z",
              },
            ],
          },
          {
            course_id: "ece255",
            time_spent: [
              {
                ended_at: "2021-03-16T05:31:57.775Z",
                notes: "Notes 123",
                started_at: "2021-03-16T03:31:20.176Z",
              },
              {
                ended_at: "2021-03-17T04:31:57.775Z",
                notes: "Notes 123",
                started_at: "2021-03-17T03:31:20.176Z",
              },
            ],
          },
          {
            course_id: "ece250",
            time_spent: [
              {
                ended_at: "2021-03-16T05:31:57.775Z",
                notes: "Notes 123",
                started_at: "2021-03-16T03:31:20.176Z",
              },
              {
                ended_at: "2021-03-17T04:31:57.775Z",
                notes: "Notes 123",
                started_at: "2021-03-17T03:31:20.176Z",
              },
            ],
          },
        ]}
      />

      <WeeklyChart
        courses={[
          {
            course_id: "ECE 123",
            time_spent: [
              {
                ended_at: "2021-03-16T05:31:57.775Z",
                notes: "Notes 123",
                started_at: "2021-03-16T03:31:20.176Z",
              },
            ],
          },
          {
            course_id: "ECE 240",
            time_spent: [
              {
                ended_at: "2021-03-16T05:31:57.775Z",
                notes: "Notes 123",
                started_at: "2021-03-16T03:31:20.176Z",
              },
              {
                ended_at: "2021-03-17T04:31:57.775Z",
                notes: "Notes 123",
                started_at: "2021-03-17T03:31:20.176Z",
              },
            ],
          },
          {
            course_id: "ECE 250",
            time_spent: [
              {
                ended_at: "2021-03-16T05:31:57.775Z",
                notes: "Notes 123",
                started_at: "2021-03-16T03:31:20.176Z",
              },
              {
                ended_at: "2021-03-17T04:31:57.775Z",
                notes: "Notes 123",
                started_at: "2021-03-17T03:31:20.176Z",
              },
            ],
          },
        ]}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default DataAnalysisScreen;
