import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import GoalChart from "../components/charts/GoalChart";
import Screen from "../components/Screen";
import util from "../utility/helper";

export default function ProgressDetailScreen({ navigation, route }) {
  const userData = route.params;
  console.log("userData", userData);
  // const getCoursesApi = useApi(coursesApi.getCourses);

  function getSchedule(userData) {
    return util.getScheduleForProgressVisual(userData);
  }

  function getData(userData) {
    return util.getDataForProgressVisual(userData);
    // return util.getDataForProgressVisual(userData);

    // return [
    //   {
    //     course_id: "ECE101",
    //     course_name: "Chemistry",
    //     deliverables: {},
    //     desired_grade: 70,
    //     expected_difficulty: 1,
    //     time_spent: [
    //       {
    //         ended_at: "2021-03-16T05:31:57.775Z",
    //         notes: "Notes 123",
    //         started_at: "2021-03-16T03:31:20.176Z",
    //       },
    //     ],
    //   },
    //   {
    //     course_id: "ECE105",
    //     course_name: "Physics ",
    //     deliverables: {
    //       e29be61e4c8f7a80296141a23f1752641e1e4e036db5e00ac912dac012977061: {
    //         completed: true,
    //         deliverable_id:
    //           "e29be61e4c8f7a80296141a23f1752641e1e4e036db5e00ac912dac012977061",
    //         deliverable_name: "Assignment 2",
    //         due_at: "2021-08-21T23:15:00Z",
    //         weight: 10,
    //       },
    //       fca379a735e144682e62ffd6ca1bad38ae0740c662b1002ddc40ba069ecdcb3d: {
    //         completed: true,
    //         deliverable_id:
    //           "fca379a735e144682e62ffd6ca1bad38ae0740c662b1002ddc40ba069ecdcb3d",
    //         deliverable_name: "Lab 1",
    //         due_at: "2021-03-22T03:59:00Z",
    //         weight: 15,
    //       },
    //     },
    //     desired_grade: 60,
    //     expected_difficulty: 1,
    //     time_spent: [
    //       {
    //         ended_at: "2021-03-22T01:38:00Z",
    //         notes: "New Notes 2123",
    //         started_at: "2021-03-21T23:15:00Z",
    //       },
    //       {
    //         ended_at: "2021-03-21T10:00:00Z",
    //         notes: "New Notes 2123",
    //         started_at: "2021-03-21T09:00:00Z",
    //       },
    //     ],
    //   },
    //   {
    //     course_id: "ECE406",
    //     course_name: "Design and Analysis of Algorithms",
    //     deliverables: {
    //       "0d543cbcf72a74e9eefef2320e72aea4be1c299c3b5afd1b8aad2eb2203043a6": {
    //         completed: true,
    //         deliverable_id:
    //           "0d543cbcf72a74e9eefef2320e72aea4be1c299c3b5afd1b8aad2eb2203043a6",
    //         deliverable_name: "Lab1",
    //         due_at: "2021-08-21T23:15:00Z",
    //         weight: 20,
    //       },
    //       "851bd15e6e970ae1df50fd07443d5fac214c263ff260505e652d4715b1bafd2f": {
    //         completed: true,
    //         deliverable_id:
    //           "851bd15e6e970ae1df50fd07443d5fac214c263ff260505e652d4715b1bafd2f",
    //         deliverable_name: "Lab 5",
    //         due_at: "2021-08-21T22:06:00Z",
    //         weight: 20,
    //       },
    //       "9e074eff012b9e3d6fee78da1b0d77e9cfc2943a0cb9c1342030c474396b50a9": {
    //         completed: false,
    //         deliverable_id:
    //           "9e074eff012b9e3d6fee78da1b0d77e9cfc2943a0cb9c1342030c474396b50a9",
    //         deliverable_name: "Lab 4",
    //         due_at: "2021-03-19T04:32:00Z",
    //         grade: 80,
    //         weight: 90,
    //       },
    //       c8361f9b468e68c86da024270e0949ce139cb704b8d7cce586681b99f3a7ea56: {
    //         completed: true,
    //         deliverable_id:
    //           "c8361f9b468e68c86da024270e0949ce139cb704b8d7cce586681b99f3a7ea56",
    //         deliverable_name: "A2",
    //         due_at: "2000-01-23T04:56:07Z",
    //         grade: 30,
    //         weight: 10,
    //       },
    //       f3f21406ccbc76719ab0b80ed284e80ec84ac101c6a76c566d04bcb41a47ee97: {
    //         completed: true,
    //         deliverable_id:
    //           "f3f21406ccbc76719ab0b80ed284e80ec84ac101c6a76c566d04bcb41a47ee97",
    //         deliverable_name: "deliverable_name",
    //         due_at: "2000-01-23T04:56:07Z",
    //         grade: 20,
    //         weight: 10,
    //       },
    //     },
    //     desired_grade: 60,
    //     expected_difficulty: 2,
    //     time_spent: [
    //       {
    //         ended_at: "2000-01-23T08:56:07Z",
    //         notes: "notes",
    //         started_at: "2000-01-23T04:56:07Z",
    //       },
    //       {
    //         ended_at: "2000-01-23T04:56:07Z",
    //         notes: "notes",
    //         started_at: "2000-01-23T04:56:07Z",
    //       },
    //       {
    //         ended_at: "2000-01-23T04:56:07Z",
    //         notes: "notes",
    //         started_at: "2000-01-23T04:56:07Z",
    //       },
    //       {
    //         ended_at: "2000-01-23T04:56:07Z",
    //         notes: "notes",
    //         started_at: "2000-01-23T04:56:07Z",
    //       },
    //       {
    //         ended_at: "2021-03-17T00:59:21.588000Z",
    //         notes: "New Notes 2123",
    //         started_at: "2021-03-17T00:59:21.588000Z",
    //       },
    //       {
    //         ended_at: "2021-03-22T03:01:00Z",
    //         notes: "New Notes 2123",
    //         started_at: "2021-03-21T23:15:00Z",
    //       },
    //     ],
    //   },
    //   {
    //     course_id: "ECE454",
    //     course_name: "Distributed System",
    //     deliverables: {
    //       "0d543cbcf72a74e9eefef2320e72aea4be1c299c3b5afd1b8aad2eb2203043a6": {
    //         completed: false,
    //         deliverable_id:
    //           "0d543cbcf72a74e9eefef2320e72aea4be1c299c3b5afd1b8aad2eb2203043a6",
    //         deliverable_name: "Lab1",
    //         due_at: "2021-03-24T03:59:00Z",
    //         grade: 80,
    //         weight: 15,
    //       },
    //     },
    //     desired_grade: 90,
    //     expected_difficulty: 4,
    //     time_spent: [],
    //   },
    //   {
    //     course_id: "ECE457B",
    //     course_name: "Machine Learning",
    //     deliverables: {
    //       b7aa455566f4a6b09ac5fccb45386b28ee84916c7af7b8460064c124c1d427ed: {
    //         completed: true,
    //         deliverable_id:
    //           "b7aa455566f4a6b09ac5fccb45386b28ee84916c7af7b8460064c124c1d427ed",
    //         deliverable_name: "Assignment 1",
    //         due_at: "2021-08-26T03:59:00Z",
    //         weight: 20,
    //       },
    //       fca379a735e144682e62ffd6ca1bad38ae0740c662b1002ddc40ba069ecdcb3d: {
    //         completed: true,
    //         deliverable_id:
    //           "fca379a735e144682e62ffd6ca1bad38ae0740c662b1002ddc40ba069ecdcb3d",
    //         deliverable_name: "Lab 1",
    //         due_at: "2021-08-21T23:15:00Z",
    //         weight: 10,
    //       },
    //     },
    //     desired_grade: 80,
    //     expected_difficulty: 4,
    //     time_spent: [
    //       {
    //         ended_at: "2000-01-23T05:56:07Z",
    //         notes: "notes",
    //         started_at: "2000-01-23T04:56:07Z",
    //       },
    //       {
    //         ended_at: "2000-01-23T05:56:07Z",
    //         notes: "notes",
    //         started_at: "2000-01-23T04:56:07Z",
    //       },
    //       {
    //         ended_at: "2000-01-23T05:56:07Z",
    //         notes: "notes",
    //         started_at: "2000-01-23T04:56:07Z",
    //       },
    //       {
    //         ended_at: "2000-01-23T04:56:07Z",
    //         notes: "notes",
    //         started_at: "2000-01-23T04:56:07Z",
    //       },
    //     ],
    //   },
    // ];
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

  const schedule2 = {
    ends_at: "2000-01-23T00:00:00Z",
    starts_at: "2000-01-23T00:00:00Z",
    time_allocations: {
      ECE101: 3.75,
      ECE105: 3.75,
      ECE406: 8.5,
      ECE454: 10.25,
      ECE457B: 3.75,
    },
  };
  const data = [
    {
      course_id: "ECE101",
      time_spent: [
        {
          ended_at: "2021-03-16T05:31:57.775Z",
          notes: "Notes 123",
          started_at: "2021-03-16T03:31:20.176Z",
        },
      ],
    },
    {
      course_id: "ECE255",
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
      course_id: "ECE250",
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
      course_id: "ECE499",
      time_spent: [
        {
          ended_at: "2021-03-13T05:31:57.775Z",
          notes: "Notes 123",
          started_at: "2021-03-13T03:31:20.176Z",
        },
        {
          ended_at: "2021-03-14T04:31:57.775Z",
          notes: "Notes 123",
          started_at: "2021-03-14T03:31:20.176Z",
        },
        {
          ended_at: "2021-03-15T06:31:57.775Z",
          notes: "Notes 123",
          started_at: "2021-03-15T03:31:20.176Z",
        },
        {
          ended_at: "2021-03-16T09:31:57.775Z",
          notes: "Notes 123",
          started_at: "2021-03-16T03:31:20.176Z",
        },
        {
          ended_at: "2021-03-22T04:31:57.775Z",
          notes: "Notes 123",
          started_at: "2021-03-22T03:31:20.176Z",
        },
      ],
    },
  ];
  return (
    <Screen>
      <GoalChart courses={getData(userData)} schedule={getSchedule(userData)} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    flex: 1,
    marginTop: 15,
    // justifyContent: "center",
    alignItems: "center",
  },
});
