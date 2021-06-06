import React from 'react';
import moment from 'moment';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

/*
    Displays a pie chart of hours spent per activity, with an optional startRange and endRange
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
        - ## Example:
        <GoalChart courses={[
        {
          course_id: "ECE123",
          time_spent: [{
            ended_at: "2021-03-16T05:31:57.775Z",
            notes: "Notes 123",
            started_at: "2021-03-16T03:31:20.176Z"
          }]
        },
        {
          course_id: "ECE255",
          time_spent: [{
            ended_at: "2021-03-16T05:31:57.775Z",
            notes: "Notes 123",
            started_at: "2021-03-16T03:31:20.176Z"
          },
          {
            ended_at: "2021-03-17T04:31:57.775Z",
            notes: "Notes 123",
            started_at: "2021-03-17T03:31:20.176Z"
          }]
        },
        {
          course_id: "ECE250",
          time_spent: [{
            ended_at: "2021-03-16T05:31:57.775Z",
            notes: "Notes 123",
            started_at: "2021-03-16T03:31:20.176Z"
          },
          {
            ended_at: "2021-03-17T04:31:57.775Z",
            notes: "Notes 123",
            started_at: "2021-03-17T03:31:20.176Z"
          }]
        },
        {
          course_id: "ECE499",
          time_spent: [{
            ended_at: "2021-03-13T05:31:57.775Z",
            notes: "Notes 123",
            started_at: "2021-03-13T03:31:20.176Z"
          }, {
            ended_at: "2021-03-14T04:31:57.775Z",
            notes: "Notes 123",
            started_at: "2021-03-14T03:31:20.176Z"
          },
          {
            ended_at: "2021-03-15T06:31:57.775Z",
            notes: "Notes 123",
            started_at: "2021-03-15T03:31:20.176Z"
          },
          {
            ended_at: "2021-03-16T09:31:57.775Z",
            notes: "Notes 123",
            started_at: "2021-03-16T03:31:20.176Z"
          },
          {
            ended_at: "2021-03-22T04:31:57.775Z",
            notes: "Notes 123",
            started_at: "2021-03-22T03:31:20.176Z"
          }]
        }
      ]} schedule={{
        "ends_at": "2000-01-23",
        "max_study_hours": 1,
        "starts_at": "2000-01-23",
        "time_allocations": {
          "ECE123": 6,
          "ECE255": 7,
          "ECE250": 8,
          "ECE499": 9,
        }
      }}/>
*/
export default class GoalChart extends React.Component {
    constructor(props) {
        super(props)
        const legend = ["Goal", "Completed"]
        const barColors = ["#264653", "#2a9d8f"]
        labels = []
        data = []
        props.courses.forEach((element, i) => {
            timeSpent = this.sumHours(element.time_spent, this.props.startRange?this.props.startRange:moment("1900"),
             this.props.endRange?this.props.endRange:moment())
            courseId = element.course_id
            labels.push(courseId)
            timeGoal = props.schedule.time_allocations[courseId]
            data.push([timeSpent, timeGoal])
        })
        this.state = {
            data: {
                labels: labels,
                // legend: legend,
                data: data,
                barColors: barColors
            }
        }
    }

    sumHours(timeSpent, startRange, endRange) {
        sum = 0
        timeSpent.forEach(element => {
            if (moment(element.started_at).isSameOrAfter(startRange, 'day') && moment(element.ended_at).isSameOrBefore(endRange, 'day')) {
                sum += this.subtractHour(element)
            }
        })
        return sum
    }

    subtractHour(time) {
        return moment(time.ended_at).diff(moment(time.started_at), 'hours')
    }

    render() {
        return <View style={styles.container}>
            <View style={styles.chart}>
            <StackedBarChart
                data={this.state.data}
                width={Dimensions.get("window").height * 0.6} // from react-native
                height={Dimensions.get("window").width} // from react-native
                withHorizontalLabels={true}
                showLegend={false}
                chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#FFFFFF",
                    backgroundGradientTo: "#FFFFFF",
                    decimalPlaces: 0, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForLabels: {
                        // textAnchor: 'middle',
                        // origin: (0, 0),
                        // rotation: 270
                    },
                    propsForVerticalLabels: {
                        rotation: 270
                    },
                    propsForHorizontalLabels: {
                        rotation: 270
                    }
                }}
                style={{
                    marginVertical: 12,
                    borderRadius: 16
                }}
            />
            </View>
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    chart: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ rotate: '90deg'}]
    },
});