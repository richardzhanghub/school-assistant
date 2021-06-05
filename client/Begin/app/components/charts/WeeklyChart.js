import React from 'react';
import moment from 'moment';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

import { LineChart } from "react-native-chart-kit";

/* NOTES: 
    WeeklyChart could show multiple courses juxtaposed in the same graph, or sum the hours for all courses into the same graph
    I wasn't sure which is more useful, so for now input is simply an array of time_spent objects
*/


/*
    Displays a week of hours studied, always starting from Monday
    @ props:
        -   timeSpent: 
                Array[
                    Object{
                        ended_at: Date,
                        notes: string,
                        started_at: Date
                    }
                ]
        - ## Example:
            <WeeklyChart timeSpent={[
            {
                ended_at: "2021-03-16T05:31:57.775Z",
                notes: "Notes 123",
                started_at: "2021-03-16T03:31:20.176Z"
            },
            {
                ended_at: "2021-03-17T04:31:57.775Z",
                notes: "Notes 123",
                started_at: "2021-03-17T03:31:20.176Z"
            },
            {
                ended_at: "2021-03-19T06:31:57.775Z",
                notes: "Notes 123",
                started_at: "2021-03-19T03:31:20.176Z"
            },
            {
                ended_at: "2021-03-20T08:31:57.775Z",
                notes: "Notes 123",
                started_at: "2021-03-20T03:31:20.176Z"
            }
        ]}/>
    */
export default class WeeklyChart extends React.Component {
    constructor(props) {
        super(props)
        const timeSpent = props.timeSpent
        data = [this.sumHours(timeSpent, 0), this.sumHours(timeSpent, 1), this.sumHours(timeSpent, 2),
        this.sumHours(timeSpent, 3), this.sumHours(timeSpent, 4), this.sumHours(timeSpent, 5), this.sumHours(timeSpent, 6)]
        max = this.findMax(data)
        this.state = {
            data: { labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], datasets: [{ data: data }] },
            max: max
        }
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
            <Text>Weekly Study Time</Text>
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
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
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