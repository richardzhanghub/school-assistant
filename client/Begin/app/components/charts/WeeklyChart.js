import React from 'react';
import moment from 'moment';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

import { LineChart } from "react-native-chart-kit";

/*
    Displays a week of hours studied per course, starting from Monday, with an optional startRange and endRange for future use -> multiple week scroll
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
        - startRange: Date (optional)
        - endRange: Date (optional)
        - ## Example:
        <WeeklyChart courses={[
        {
          course_id: "ECE 123",
          time_spent: [{
            ended_at: "2021-03-16T05:31:57.775Z",
            notes: "Notes 123",
            started_at: "2021-03-16T03:31:20.176Z"
          }]
        },
        {
          course_id: "ECE 240",
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
          course_id: "ECE 250",
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
        }
      ]} />
*/
export default class WeeklyChart extends React.Component {
    constructor(props) {
        super(props)
        if (!props.hasOwnProperty('courses')) { throw 'Required property missing: "courses"' }
        const colorPalette = ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51", "#606c38", "#283618", "#118ab2"]
        const courses = props.courses
        // Show at most 3 courses for now to avoid cluttering
        max = 0
        datasets = []
        courses.forEach((course, i) => {
            console.log(course)
            if (i < 3) {
                data = [this.sumHours(course.time_spent, 0), this.sumHours(course.time_spent, 1), this.sumHours(course.time_spent, 2),
                this.sumHours(course.time_spent, 3), this.sumHours(course.time_spent, 4), this.sumHours(course.time_spent, 5), this.sumHours(course.time_spent, 6)]
                console.log(data)
                switch (i) {
                    case 1:
                        datasets.push({ data: data, color: (opacity = 1) => `rgba(244, 162, 97, ${opacity})` })
                    case 2:
                        datasets.push({ data: data, color: (opacity = 1) => `rgba(38, 70, 83, ${opacity})` })
                        case 3:
                        datasets.push({ data: data, color: (opacity = 1) => `rgba(42, 157, 143, ${opacity})` })
                }
                max = this.findMax(data)
            }
        })
        this.state = {
            data: { labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], datasets: datasets },
            max: max
        }
        console.log(this.state)
    }

    // day: number {0, 1, 2, 3, 4, 5, 6} for {mon, tue, wed, thu, fri, sat, sun}
    sumHours(timeSpent, day) {
        mon = moment().startOf('isoweek')
        targetDay = mon.add(day, 'days')
        sum = 0
        timeSpent.forEach(element => {
            if (targetDay.isSame(moment(element.started_at), 'day')) {
                sum += this.subtractHour(element)
            }
        })
        return sum
    }

    subtractHour(time) {
        return moment(time.ended_at).diff(moment(time.started_at), 'hours')
    }

    findMax(arr) {
        max = 0
        arr.forEach(el => { if (el > max) { max = el } })
        return max
    }

    render() {
        return <View style={styles.container}>
            <Text style={{ color: '#000000' }}>Weekly Study Time</Text>
            <LineChart
                data={this.state.data}
                width={Dimensions.get("window").width} // from react-native
                height={220}
                fromZero={true}
                yAxisLabel=""
                yAxisSuffix=" hr"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#FFFFFF",
                    backgroundGradientTo: "#FFFFFF",
                    decimalPlaces: 0, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(244, 162, 97, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffffff"
                    }
                }}
                segments={this.state.max}
                style={{
                    marginVertical: 12,
                    borderRadius: 16
                }}
            />
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
});