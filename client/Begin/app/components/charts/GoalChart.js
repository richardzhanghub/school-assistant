import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import { Animated, Dimensions, StyleSheet, Text, TouchableHighlight, View } from 'react-native';


/*
    Displays a bar chart of hours spent per course, with an optional startRange and endRange
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
        },
        {
          course_id: "ECE 499",
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
        },
        {
          course_id: "ECE 501",
          time_spent: [{
            ended_at: "2021-03-13T05:31:57.775Z",
            notes: "Notes 123",
            started_at: "2021-03-13T03:31:20.176Z"
          }]
        },
        {
          course_id: "ECE 502",
          time_spent: [{
            ended_at: "2021-03-13T05:31:57.775Z",
            notes: "Notes 123",
            started_at: "2021-03-13T03:31:20.176Z"
          }]
        },
        {
          course_id: "ECE 503",
          time_spent: [{
            ended_at: "2021-03-13T05:31:57.775Z",
            notes: "Notes 123",
            started_at: "2021-03-13T03:31:20.176Z"
          }]
        }
      ]} schedule={{
        "ends_at": "2000-01-23",
        "max_study_hours": 1,
        "starts_at": "2000-01-23",
        "time_allocations": {
          "ECE 123": 6,
          "ECE 240": 7,
          "ECE 250": 8,
          "ECE 499": 15,
          "ECE 601": 3,
          "ECE 999": 10
        }
      }}/>
*/
export default class PlayerLog extends React.Component {

  /*
    data: Object{
      [courseId]: Object{
        timeGoal: Number
        timeSpent: Number
        width: Number
      }
    }
  */
  constructor(props) {
    super(props)
    const startOfMonth = moment().startOf('month')  // only use data[0] => this month for now, will implement more months later
    const deviceWidth = Dimensions.get('window').width
    const maxWidth = deviceWidth - 100
    labels = []
    data = []
    d = {}
    // populate timeSpent
    props.courses.forEach((element, i) => {
      courseId = element.course_id
      timeSpent = this.sumHours(element.time_spent, this.props.startRange ? this.props.startRange : startOfMonth,
        this.props.endRange ? this.props.endRange : moment())
      labels.push(courseId)
      d[courseId] = {
        timeSpent: timeSpent
      }
    })
    // populate timeGoal
    for (const [courseId, timeGoal] of Object.entries(this.props.schedule.time_allocations)) {
      if (labels.includes(courseId)) {
        d[courseId].timeGoal = timeGoal
        d[courseId].width = Math.floor(maxWidth / timeGoal * d[courseId].timeSpent) < maxWidth ?
          Math.floor(maxWidth / timeGoal * d[courseId].timeSpent) : maxWidth
      }
      else {
        labels.push(courseId)
        d[courseId] = {
          timeSpent: 0,
          timeGoal: timeGoal,
          width: 5
        }
      }
    }
    data.push(d)
    this.state = {
      currentIndex: 0,
      labels: labels,
      data: data
    }
    console.log(data)
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

  onPressLeft() {
    const { currentIndex } = this.state
    if (currentIndex > 0) this.handleAnimation(currentIndex - 1)
  }

  onPressRight() {
    const { currentIndex } = this.state
    const { data } = this.props
    if (currentIndex < data.length - 1) this.handleAnimation(currentIndex + 1)
  }

  handleAnimation(index) {
    const { data } = this.props
    const width = this.getWidth(data[index])
    const timing = Animated.timing

    const indicators = ['pts', 'ast', 'reb', 'stl', 'blk', 'tov', 'min']
    Animated.parallel(indicators.map(item => {
      return timing(this.state[item], { toValue: width[item] })
    })).start()
    /**
     * Animated won't trigger react life cycle
     * I'm not sure if using animated and setState in a same time would affect performance, not bad for now
     */
    this.setState({
      currentIndex: index
    })
  }

  render() {
    const deviceWidth = Dimensions.get('window').width
    const maxWidth = deviceWidth - 100
    const currentIndex = this.state.currentIndex
    const data = this.state.data[currentIndex]
    const labels = this.state.labels
    const len = labels.length

    const d = new Date()
    const date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()

    /* set opacity=0 if no prev or no next, or the size will be changed unexpected */
    const canPrev = currentIndex < data.length - 1 ? 1 : 0
    const canNext = currentIndex > 0 ? 1 : 0

    return (
      <View style={styles.container}>

        <View style={styles.controller}>
          <TouchableHighlight onPress={this.onPressLeft.bind(this)} underlayColor='transparent' style={[styles.button, { opacity: canPrev }]}>
            <Icon name='ios-chevron-back-outline' size={28} color='#6B7C96' style={styles.chevronLeft} />
          </TouchableHighlight>
          <Text style={styles.date}>{date}</Text>
          <TouchableHighlight onPress={this.onPressLeft.bind(this)} underlayColor='transparent' style={[styles.button, { opacity: canPrev }]}>
            <Icon name='ios-chevron-forward-outline' size={28} color='#6B7C96' style={styles.chevronRight} />
          </TouchableHighlight>
        </View>

        {len > 0 &&
          <View style={styles.item}>
            <Text style={styles.label}>{labels[0]}</Text>
            <View style={styles.data}>
              <Animated.View style={[styles.bar, styles.points, { width: data[labels[0]].hasOwnProperty("width") ? data[labels[0]].width : maxWidth }]} />
              <Text style={styles.dataNumber}>{data[labels[0]].timeSpent}/{data[labels[0]].hasOwnProperty("timeGoal") ? data[labels[0]].timeGoal : 0} hours</Text>
            </View>
          </View>
        }
        {len > 1 &&
          <View style={styles.item}>
            <Text style={styles.label}>{labels[1]}</Text>
            <View style={styles.data}>
              <Animated.View style={[styles.bar, styles.assists, { width: data[labels[1]].hasOwnProperty("width") ? data[labels[1]].width : maxWidth }]} />
              <Text style={styles.dataNumber}>{data[labels[1]].timeSpent}/{data[labels[1]].hasOwnProperty("timeGoal") ? data[labels[1]].timeGoal : 0} hours</Text>
            </View>
          </View>
        }
        {len > 2 &&
          <View style={styles.item}>
            <Text style={styles.label}>{labels[2]}</Text>
            <View style={styles.data}>
              <Animated.View style={[styles.bar, styles.rebounds, { width: data[labels[2]].hasOwnProperty("width") ? data[labels[2]].width : maxWidth }]} />
              <Text style={styles.dataNumber}>{data[labels[2]].timeSpent}/{data[labels[2]].hasOwnProperty("timeGoal") ? data[labels[2]].timeGoal : 0} hours</Text>
            </View>
          </View>
        }
        {len > 3 &&
          <View style={styles.item}>
            <Text style={styles.label}>{labels[3]}</Text>
            <View style={styles.data}>
              <Animated.View style={[styles.bar, styles.steals, { width: data[labels[3]].hasOwnProperty("width") ? data[labels[3]].width : maxWidth }]} />
              <Text style={styles.dataNumber}>{data[labels[3]].timeSpent}/{data[labels[3]].hasOwnProperty("timeGoal") ? data[labels[3]].timeGoal : 0} hours</Text>
            </View>
          </View>
        }
        {len > 4 &&
          <View style={styles.item}>
            <Text style={styles.label}>{labels[4]}</Text>
            <View style={styles.data}>
              <Animated.View style={[styles.bar, styles.blocks, { width: data[labels[4]].hasOwnProperty("width") ? data[labels[4]].width : maxWidth }]} />
              <Text style={styles.dataNumber}>{data[labels[4]].timeSpent}/{data[labels[4]].hasOwnProperty("timeGoal") ? data[labels[4]].timeGoal : 0} hours</Text>
            </View>
          </View>
        }
        {len > 5 &&
          <View style={styles.item}>
            <Text style={styles.label}>{labels[5]}</Text>
            <View style={styles.data}>
              <Animated.View style={[styles.bar, styles.turnovers, { width: data[labels[5]].hasOwnProperty("width") ? data[labels[5]].width : maxWidth }]} />
              <Text style={styles.dataNumber}>{data[labels[5]].timeSpent}/{data[labels[5]].hasOwnProperty("timeGoal") ? data[labels[5]].timeGoal : 0} hours</Text>
            </View>
          </View>
        }
        {len > 6 &&
          <View style={styles.item}>
            <Text style={styles.label}>{labels[6]}</Text>
            <View style={styles.data}>
              <Animated.View style={[styles.bar, styles.minutes, { width: data[labels[6]].hasOwnProperty("width") ? data[labels[6]].width : maxWidth }]} />
              <Text style={styles.dataNumber}>{data[labels[6]].timeSpent}/{data[labels[6]].hasOwnProperty("timeGoal") ? data[labels[6]].timeGoal : 0} hours</Text>
            </View>
          </View>
        }
        {len > 7 &&
          <View style={styles.item}>
            <Text style={styles.label}>{labels[7]}</Text>
            <View style={styles.data}>
              <Animated.View style={[styles.bar, styles.minutes, { width: data[labels[7]].hasOwnProperty("width") ? data[labels[7]].width : maxWidth }]} />
              <Text style={styles.dataNumber}>{data[labels[7]].timeSpent}/{data[labels[7]].hasOwnProperty("timeGoal") ? data[labels[7]].timeGoal : 0} hours</Text>
            </View>
          </View>
        }
        {len > 8 &&
          <View style={styles.item}>
            <Text style={styles.label}>{labels[8]}</Text>
            <View style={styles.data}>
              <Animated.View style={[styles.bar, styles.minutes, { width: data[labels[8]].hasOwnProperty("width") ? data[labels[8]].width : maxWidth }]} />
              <Text style={styles.dataNumber}>{data[labels[8]].timeSpent}/{data[labels[8]].hasOwnProperty("timeGoal") ? data[labels[8]].timeGoal : 0} hours</Text>
            </View>
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginTop: 6
  },
  // Item
  item: {
    height: 40,
    flexDirection: 'column',
    marginBottom: 5,
    paddingHorizontal: 10
  },
  label: {
    color: '#CBCBCB',
    flex: 1,
    fontSize: 12,
    position: 'relative',
    top: 6
  },
  data: {
    flex: 2,
    flexDirection: 'row'
  },
  dataNumber: {
    color: '#CBCBCB',
    fontSize: 11,
    top: 7
  },
  // Bar
  bar: {
    alignSelf: 'center',
    borderRadius: 5,
    height: 8,
    marginRight: 5
  },
  points: {
    backgroundColor: '#F55443'
  },
  assists: {
    backgroundColor: '#FCBD24'
  },
  rebounds: {
    backgroundColor: '#59838B'
  },
  steals: {
    backgroundColor: '#4D98E4'
  },
  blocks: {
    backgroundColor: '#418E50'
  },
  turnovers: {
    backgroundColor: '#7B7FEC'
  },
  minutes: {
    backgroundColor: '#3ABAA4'
  },
  // controller
  controller: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 15
  },
  button: {
    flex: 1,
    position: 'relative',
    height: 28,
    top: -1,
    backgroundColor: 'yellow'
  },
  chevronLeft: {
    alignSelf: 'flex-end',
    height: 28,
    marginRight: 0,
    width: 28
  },
  chevronRight: {
    alignSelf: 'flex-start',
    height: 28,
    marginLeft: 0,
    width: 28
  },
  date: {
    color: '#6B7C96',
    flex: 2,
    fontSize: 22,
    fontWeight: '300',
    height: 28,
    textAlign: 'center'
  },
  // overlap
  center: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  behind: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%'
  }

})

PlayerLog.propTypes = {
  data: PropTypes.array
}