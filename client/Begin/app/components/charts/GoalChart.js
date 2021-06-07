import { MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";

/*
    Displays a bar chart of weekly hours spent versus scheduled hours, per week
    If optional props startRange and endRange are defined, then displays the entire period instead
    @ props:
        - courses:
            Array[
                course:
                    Object{
                        course_id: string,
                        time_spent: Array[
                            Object{
                                ended_at: Date,
                                notes: string,
                                started_at: Date
                            }
                        ]
                    }
            ]}
        - schedule:
            Object{
                time_allocations: Object{
                        key: Number,
                        key: Number
                    }
                ]
            }
        - startRange: Date (optional)
        - endRange: Date (optional)
        ## Example:
        <GoalChart courses={[
        {
          course_id: "ECE 100",
          time_spent: [{
            ended_at: "2021-03-16T04:31:57.775Z",
            notes: "Notes 123",
            started_at: "2021-03-16T03:31:20.176Z"
          },
          {
            ended_at: "2021-03-10T04:31:57.775Z",
            notes: "Notes 123",
            started_at: "2021-03-10T03:31:20.176Z"
          },
          {
            ended_at: "2021-03-04T04:31:57.775Z",
            notes: "Notes 123",
            started_at: "2021-03-04T03:31:20.176Z"
          }]
        },
        {
          course_id: "ECE 200",
          time_spent: [{
            ended_at: "2021-03-16T04:31:57.775Z",
            notes: "Notes 123",
            started_at: "2021-03-16T03:31:20.176Z"
          },
          {
            ended_at: "2021-03-10T04:31:57.775Z",
            notes: "Notes 123",
            started_at: "2021-03-10T03:31:20.176Z"
          }]
        },
        {
          course_id: "ECE 300",
          time_spent: [{
            ended_at: "2021-03-16T06:31:57.775Z",
            notes: "Notes 123",
            started_at: "2021-03-16T03:31:20.176Z"
          },
          {
            ended_at: "2021-03-10T04:31:57.775Z",
            notes: "Notes 123",
            started_at: "2021-03-10T03:31:20.176Z"
          }]
        },
        {
          course_id: "ECE 400",
          time_spent: [{
            ended_at: "2021-03-16T06:31:57.775Z",
            notes: "Notes 123",
            started_at: "2021-03-16T03:31:20.176Z"
          },
          {
            ended_at: "2021-03-10T04:31:57.775Z",
            notes: "Notes 123",
            started_at: "2021-03-10T03:31:20.176Z"
          }]
        },
        {
          course_id: "ECE 500",
          time_spent: [{
            ended_at: "2021-03-16T08:31:57.775Z",
            notes: "Notes 123",
            started_at: "2021-03-16T03:31:20.176Z"
          }]
        },
        {
          course_id: "ECE 600",
          time_spent: [{
            ended_at: "2021-03-16T08:31:57.775Z",
            notes: "Notes 123",
            started_at: "2021-03-16T03:31:20.176Z"
          }]
        },
        {
          course_id: "ECE 700",
          time_spent: [{
            ended_at: "2021-03-16T09:31:57.775Z",
            notes: "Notes 123",
            started_at: "2021-03-16T03:31:20.176Z"
          }]
        },
        {
          course_id: "ECE 800",
          time_spent: [{
            ended_at: "2021-03-16T09:31:57.775Z",
            notes: "Notes 123",
            started_at: "2021-03-16T03:31:20.176Z"
          }]
        },
        {
          course_id: "ECE 900",
          time_spent: [{
            ended_at: "2021-03-16T06:31:57.775Z",
            notes: "Notes 123",
            started_at: "2021-03-16T03:31:20.176Z"
          }]
        }
      ]} schedule={{
        "ends_at": "2000-01-23",
        "max_study_hours": 1,
        "starts_at": "2000-01-23",
        "time_allocations": {
          "ECE 100": 1,
          "ECE 200": 2,
          "ECE 300": 3,
          "ECE 400": 4,
          "ECE 500": 5,
          "ECE 600": 6,
          "ECE 700": 7,
          "ECE 800": 8,
          "ECE 900": 9
        }
      }}/>
*/
export default class GoalChart extends React.Component {
  /*
    data: Object{
      [courseId]: Object{
        timeGoal: Number
        timeSpent: Number
        width: Number
      },
    }
  */
  constructor(props) {
    super(props);
    if (!props.hasOwnProperty('courses')) {throw 'Required property missing: "courses"'}
    if (!props.hasOwnProperty('schedule')) {throw 'Required property missing: "schedule"'}
    const startOfWeek = moment().startOf("isoweek");
    const deviceWidth = Dimensions.get("window").width;
    const maxWidth = deviceWidth * 0.7;
    labels = [];
    data = [];
    dataWeek = {};
    // populate dataWeek 0 and labels
    for (const [courseId, timeGoal] of Object.entries(
      this.props.schedule.time_allocations
    )) {
      labels.push(courseId);
      dataWeek[courseId] = {
        timeGoal: timeGoal,
        timeSpent: 0,
      };
    }
    props.courses.forEach((course) => {
      if (labels.includes(course.course_id)) {
        dataWeek[course.course_id].timeSpent =
          dataWeek[course.course_id].timeSpent +
          this.sumHours(
            course.time_spent,
            this.props.startRange ? this.props.startRange : startOfWeek,
            this.props.endRange ? this.props.endRange : moment()
          );
      }
    });
    for (const [courseId, val] of Object.entries(dataWeek)) {
      dataWeek[courseId].width = val.timeSpent
        ? val.timeSpent > val.timeGoal
          ? maxWidth
          : (maxWidth / val.timeGoal) * val.timeSpent
        : 5;
    }
    data.push(dataWeek);
    // populate dataWeek 1->... if startRange and endRange are not defined
    let index = 1;
    let keepGoing;
    if (!this.props.startRange && !this.props.endRange) {
      do {
        const weekStart = moment(startOfWeek).subtract(index, "week");
        const weekEnd = moment(startOfWeek).subtract(index - 1, "week");
        dataWeek = this.getGoals();
        props.courses.forEach((course) => {
          if (labels.includes(course.course_id)) {
            dataWeek[course.course_id].timeSpent =
              dataWeek[course.course_id].timeSpent +
              this.sumHours(course.time_spent, weekStart, weekEnd);
          }
        });
        for (const [courseId, val] of Object.entries(dataWeek)) {
          dataWeek[courseId].width = val.timeSpent
            ? val.timeSpent > val.timeGoal
              ? maxWidth
              : (maxWidth / val.timeGoal) * val.timeSpent
            : 5;
        }
        keepGoing = false;
        for (const [courseId, val] of Object.entries(dataWeek)) {
          if (val.timeSpent > 0) {
            keepGoing = true;
          }
        }
        if (keepGoing) {
          data.push(dataWeek);
        }
        index += 1;
      } while (keepGoing && index < 10);
    }
    // init Animated.View values to empty initially (5 px)
    anims = {};
    labels.forEach((label) => {
      anims[label] = new Animated.Value(5);
    });

    this.state = {
      labels: labels,
      anims: anims,
      data: data,
      currentIndex: 0,
      week: moment(),
    };
  }

  getGoals() {
    dataWeek = {};
    for (const [courseId, timeGoal] of Object.entries(
      this.props.schedule.time_allocations
    )) {
      dataWeek[courseId] = {
        timeGoal: timeGoal,
        timeSpent: 0,
      };
    }
    return dataWeek;
  }

  sumHours(timeSpent, startRange, endRange) {
    sum = 0;
    timeSpent.forEach((element) => {
      if (
        moment(element.started_at).isSameOrAfter(startRange, "day") &&
        moment(element.ended_at).isSameOrBefore(endRange, "day")
      ) {
        sum += moment(element.ended_at).diff(
          moment(element.started_at),
          "hours"
        );
      }
    });
    return sum;
  }

  onPressLeft() {
    const currentIndex = this.state.currentIndex;
    const data = this.state.data;
    this.state.week = this.state.week.subtract(1, "week");
    if (currentIndex < data.length - 1) this.handleAnimation(currentIndex + 1);
  }

  onPressRight() {
    const currentIndex = this.state.currentIndex;
    this.state.week = this.state.week.add(1, "week");
    if (currentIndex > 0) this.handleAnimation(currentIndex - 1);
  }

  startAnimation() {
    const labels = this.state.labels;
    const data = this.state.data[0];
    const timing = Animated.timing;

    Animated.parallel(
      labels.map((label) => {
        return timing(anims[label], {
          toValue: data[label].width,
          useNativeDriver: false,
        });
      })
    ).start();
  }

  handleAnimation(newIndex) {
    const labels = this.state.labels;
    const newData = this.state.data[newIndex];
    const state = this.state;
    state.currentIndex = newIndex;

    const timing = Animated.timing;
    Animated.parallel(
      labels.map((label) => {
        return timing(anims[label], {
          toValue: newData[label].width,
          useNativeDriver: false,
        });
      })
    ).start(() => {
      this.setState(state);
    }); // callback triggers React lifecycle
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.startAnimation();
  }

  render() {
    const deviceWidth = Dimensions.get("window").width;
    const maxWidth = deviceWidth * 0.7;
    const currentIndex = this.state.currentIndex;
    const data = this.state.data[currentIndex];
    const labels = this.state.labels;
    const len = labels.length;
    const week = this.state.week.format("[Week of ]MMMM D");
    /* set opacity=0 if no prev or no next, or the size will be changed unexpected */
    const canPrev = currentIndex < this.state.data.length - 1 ? 1 : 0.2;
    const canNext = currentIndex > 0.2 ? 1 : 0.2;

    return (
      <View style={styles.container}>
        <View style={styles.controller}>
          <TouchableHighlight
            onPress={this.onPressLeft.bind(this)}
            underlayColor="transparent"
            style={[styles.button, { opacity: canPrev }]}
          >
            <MaterialCommunityIcons
              name="power-off"
              size={28}
              color="#6B7C96"
              style={styles.chevronLeft}
            />
          </TouchableHighlight>
          <Text style={styles.date}>{week}</Text>
          <TouchableHighlight
            onPress={this.onPressRight.bind(this)}
            underlayColor="transparent"
            style={[styles.button, { opacity: canNext }]}
          >
            <MaterialCommunityIcons
              name="power-on"
              size={28}
              color="#6B7C96"
              style={styles.chevronRight}
            />
          </TouchableHighlight>
        </View>

        {len > 0 && (
          <View style={styles.item}>
            <Text style={styles.label}>{labels[0]}</Text>
            <View style={styles.data}>
              <View style={[styles.barOverlay, { width: maxWidth }]} />
              <Animated.View
                style={[styles.bar, styles.color1, { width: anims[labels[0]] }]}
              />
              <Text style={styles.dataNumber}>
                {data[labels[0]].timeSpent}/{data[labels[0]].timeGoal} hours
                {data[labels[0]].timeSpent >= data[labels[0]].timeGoal
                  ? "*"
                  : ""}
              </Text>
            </View>
          </View>
        )}
        {len > 1 && (
          <View style={styles.item}>
            <Text style={styles.label}>{labels[1]}</Text>
            <View style={styles.data}>
              <View style={[styles.barOverlay, { width: maxWidth }]} />
              <Animated.View
                style={[styles.bar, styles.color2, { width: anims[labels[1]] }]}
              />
              <Text style={styles.dataNumber}>
                {data[labels[1]].timeSpent}/{data[labels[1]].timeGoal} hours
                {data[labels[1]].timeSpent >= data[labels[1]].timeGoal
                  ? "*"
                  : ""}
              </Text>
            </View>
          </View>
        )}
        {len > 2 && (
          <View style={styles.item}>
            <Text style={styles.label}>{labels[2]}</Text>
            <View style={styles.data}>
              <View style={[styles.barOverlay, { width: maxWidth }]} />
              <Animated.View
                style={[styles.bar, styles.color3, { width: anims[labels[2]] }]}
              />
              <Text style={styles.dataNumber}>
                {data[labels[2]].timeSpent}/{data[labels[2]].timeGoal} hours
                {data[labels[2]].timeSpent >= data[labels[2]].timeGoal
                  ? "*"
                  : ""}
              </Text>
            </View>
          </View>
        )}
        {len > 3 && (
          <View style={styles.item}>
            <Text style={styles.label}>{labels[3]}</Text>
            <View style={styles.data}>
              <View style={[styles.barOverlay, { width: maxWidth }]} />
              <Animated.View
                style={[styles.bar, styles.color4, { width: anims[labels[3]] }]}
              />
              <Text style={styles.dataNumber}>
                {data[labels[3]].timeSpent}/{data[labels[3]].timeGoal} hours
                {data[labels[3]].timeSpent >= data[labels[3]].timeGoal
                  ? "*"
                  : ""}
              </Text>
            </View>
          </View>
        )}
        {len > 4 && (
          <View style={styles.item}>
            <Text style={styles.label}>{labels[4]}</Text>
            <View style={styles.data}>
              <View style={[styles.barOverlay, { width: maxWidth }]} />
              <Animated.View
                style={[styles.bar, styles.color5, { width: anims[labels[4]] }]}
              />
              <Text style={styles.dataNumber}>
                {data[labels[4]].timeSpent}/{data[labels[4]].timeGoal} hours
                {data[labels[4]].timeSpent >= data[labels[4]].timeGoal
                  ? "*"
                  : ""}
              </Text>
            </View>
          </View>
        )}
        {len > 5 && (
          <View style={styles.item}>
            <Text style={styles.label}>{labels[5]}</Text>
            <View style={styles.data}>
              <View style={[styles.barOverlay, { width: maxWidth }]} />
              <Animated.View
                style={[styles.bar, styles.color6, { width: anims[labels[5]] }]}
              />
              <Text style={styles.dataNumber}>
                {data[labels[5]].timeSpent}/{data[labels[5]].timeGoal} hours
                {data[labels[5]].timeSpent >= data[labels[5]].timeGoal
                  ? "*"
                  : ""}
              </Text>
            </View>
          </View>
        )}
        {len > 6 && (
          <View style={styles.item}>
            <Text style={styles.label}>{labels[6]}</Text>
            <View style={styles.data}>
              <View style={[styles.barOverlay, { width: maxWidth }]} />
              <Animated.View
                style={[styles.bar, styles.color7, { width: anims[labels[6]] }]}
              />
              <Text style={styles.dataNumber}>
                {data[labels[6]].timeSpent}/{data[labels[6]].timeGoal} hours
                {data[labels[6]].timeSpent >= data[labels[6]].timeGoal
                  ? "*"
                  : ""}
              </Text>
            </View>
          </View>
        )}
        {len > 7 && (
          <View style={styles.item}>
            <Text style={styles.label}>{labels[7]}</Text>
            <View style={styles.data}>
              <View style={[styles.barOverlay, { width: maxWidth }]} />
              <Animated.View
                style={[styles.bar, styles.color1, { width: anims[labels[7]] }]}
              />
              <Text style={styles.dataNumber}>
                {data[labels[7]].timeSpent}/{data[labels[7]].timeGoal} hours
                {data[labels[7]].timeSpent >= data[labels[7]].timeGoal
                  ? "*"
                  : ""}
              </Text>
            </View>
          </View>
        )}
        {len > 8 && (
          <View style={styles.item}>
            <Text style={styles.label}>{labels[8]}</Text>
            <View style={styles.data}>
              <View style={[styles.barOverlay, { width: maxWidth }]} />
              <Animated.View
                style={[styles.bar, styles.color2, { width: anims[labels[8]] }]}
              />
              <Text style={styles.dataNumber}>
                {data[labels[8]].timeSpent}/{data[labels[8]].timeGoal} hours
                {data[labels[8]].timeSpent >= data[labels[8]].timeGoal
                  ? "*"
                  : ""}
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginTop: 6,
  },
  // Item
  item: {
    height: 40,
    flexDirection: "column",
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  label: {
    color: "#ABABAB",
    flex: 1,
    fontSize: 12,
    position: "relative",
    top: 6,
  },
  data: {
    flex: 2,
    flexDirection: "row",
  },
  dataNumber: {
    color: "#898989",
    fontSize: 11,
    top: 6,
  },
  // Bar
  bar: {
    alignSelf: "center",
    borderRadius: 5,
    height: 8,
    marginRight: 5,
  },
  barOverlay: {
    alignSelf: "center",
    borderRadius: 5,
    height: 8,
    backgroundColor: "#EEEEEE",
    position: "absolute",
  },
  color1: {
    backgroundColor: "#F55443",
  },
  color2: {
    backgroundColor: "#FCBD24",
  },
  color3: {
    backgroundColor: "#59838B",
  },
  color4: {
    backgroundColor: "#4D98E4",
  },
  color5: {
    backgroundColor: "#418E50",
  },
  color6: {
    backgroundColor: "#7B7FEC",
  },
  color7: {
    backgroundColor: "#3ABAA4",
  },
  // controller
  controller: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 15,
  },
  button: {
    flex: 1,
    position: "relative",
    height: 28,
    top: -1,
  },
  chevronLeft: {
    alignSelf: "flex-end",
    height: 28,
    marginRight: 0,
    width: 28,
  },
  chevronRight: {
    alignSelf: "flex-start",
    height: 28,
    marginLeft: 0,
    width: 28,
  },
  date: {
    color: "#6B7C96",
    flex: 3,
    fontSize: 22,
    fontWeight: "300",
    height: 28,
    textAlign: "center",
  },
  // overlap
  center: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  behind: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
  },
});