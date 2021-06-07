import React from 'react';
import moment from 'moment';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

import { PieChart as NativePieChart } from "react-native-chart-kit";

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
        - startRange: Date (optional)
        - endRange: Date (optional)
        - ## Example:
        <PieChart courses={[
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
export default class PieChart extends React.Component {
    constructor(props) {
        super(props)
        if (!props.hasOwnProperty('courses')) {throw 'Required property missing: "courses"'}
        const colorPalette = ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51", "#606c38", "#283618", "#118ab2"]
        data = []
        props.courses.forEach((element, i) => {
            timeSpent = this.sumHours(element.time_spent, this.props.startRange?this.props.startRange:moment("1900"),
             this.props.endRange?this.props.endRange:moment())
            course = {
                name: element.course_id,
                timeSpent: timeSpent,
                color: colorPalette[i],
                legendFontColor: colorPalette[i],
                legendFontSize: 15
            }
            data.push(course)
        })
        this.state = {
            data: data
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
            <Text>Time Breakdown</Text>
            <NativePieChart
                data={this.state.data}
                width={Dimensions.get("window").width} // from react-native
                height={220}
                chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#FFFFFF",
                    backgroundGradientTo: "#FFFFFF",
                    decimalPlaces: 1, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 16
                    }
                }}
                accessor={"timeSpent"}
                backgroundColor={"transparent"}
                paddingLeft={"5"}
                center={[10, 0]}
                // absolute
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