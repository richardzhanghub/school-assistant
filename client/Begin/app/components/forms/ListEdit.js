import React, { useState, useRef } from "react";
import CategoryPickerItem from "../CategoryPickerItem";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import coursesApi from "../../api/courses";
import useApi from "../../hooks/useApi";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from "./";
import * as Yup from "yup";
import colors from "../../config/colors";
import { set } from "react-native-reanimated";

const courseValidationSchema = Yup.object().shape({
  courseName: Yup.string().required().min(1).label("Course name"),
  courseNumber: Yup.number().required().min(1).max(10000).label("Course number"),
  grade: Yup.number().required().min(1).max(100).label("Grade"),
  difficulty: Yup.number().required().min(1).max(5).label("Difficulty"),
});

const deliverableValidationSchema = Yup.object().shape({
  deliverableName: Yup.string().required().min(1).label("Course name"),
  courseName: Yup.string().required().min(1).label("Course name"),
  dueAt: Yup.date().required(),
  grade: Yup.number().min(1).max(100).label("Grade"),
  weight: Yup.number().required().min(1).max(100).label("Difficulty")
});

const departments = [
  {
    backgroundColor: "#a55eea",
    icon: "book-open-variant",
    label: "ECE",
    value: 8,
  },
  {
    backgroundColor: "#778ca3",
    icon: "application",
    label: "Other",
    value: 9,
  },
];

function ListingEdit({handleSubmit, form}) {
  const [startTime, setStartTime] = useState(new Date(1598051730000));
  const [endTime, setEndTime] = useState(new Date());
  const addCoursesApi = useApi(coursesApi.addCourse);

  const [completed, setCompleted] = useState(false)
  const [deliverableDueAt, setDeliverableDueAt] = useState(new Date(1598051730000));

  const timeSpentForm = ( (handleSubmit) =>{
  
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <Form
            initialValues={{
              note: "",
            }}
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          > 
            <DateTimePicker
              display="inline"
              style={{height:120, width: "60%"}}
              value={startTime}
              title="startTime"
              mode="datetime"
              onChange={(event, selectedDate) => setStartTime(selectedDate)}/>
            <Text style={{textAlign: "right", color: colors.primary}}>Start Time</Text>
            <DateTimePicker
                  display="inline"
                  style={{height:120, width: "60%"}}
                  value={endTime}
                  title="endTime" 
                  mode="datetime"
                  onChange={(event, selectedDate) => setEndTime(selectedDate)}/>
            <Text style={{textAlign: "right", color: colors.primary}}>End Time</Text>
            <FormField
              maxLength={255}
              multiline
              name="note"
              numberOfLines={3}
              placeholder="Note"
            />
            <SubmitButton title="Save"/>
          </Form>
        </ScrollView>
      </View>
    )
  })

  const courseForm = ( () => {
    function courseSubmit(course, { resetForm }) {
      setProgress(0);
      setUploadVisible(true);
      const result = addCoursesApi.request(
        course,
        (progress) => setProgress(progress)
      );

      if (!result.ok) {
        setUploadVisible(false);
        return alert("Could not save the course");
      }
      resetForm();
    };

    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <Form
            initialValues={{
              courseName: "",
              courseNumber: "",
              grade: "",
              department: null,
              difficulty: ""
            }}
            onSubmit={courseSubmit}
            validationSchema={courseValidationSchema}
          >
            <FormField maxLength={255} name="courseName" placeholder="Course Name" />
            <FormField
              keyboardType="numeric"
              maxLength={8}
              name="courseNumber"
              placeholder="Course Number"
              width={200}
            />
            <Picker
              items={departments}
              name="department"
              numberOfColumns={3}
              PickerItemComponent={CategoryPickerItem}
              placeholder="Department"
              width={200}
            />
            <FormField
              keyboardType="numeric"
              maxLength={3}
              name="grade"
              placeholder="Desired Grade"
              width={200}
            />
            <FormField
              keyboardType="numeric"
              maxLength={1}
              name="difficulty"
              placeholder="Expected Difficulty (1-5)"
              width={250}
            />
            <SubmitButton title="Create" />
          </Form>
        </ScrollView>
      </View>
    )
  })

  const deliverableForm = ( (handleSubmit) => {
    var radio_props = [
      {label: 'Yes', value: completed },
      {label: 'No', value: !completed }
    ];

    return (
      <View style={{flex: 1}}>
        <ScrollView>
            <Form
            initialValues={{
              deliverableName: "",
              completed: completed,
              courseName: "",
              dueAt: "",
              grade: "",
              weight: ""
            }}
            onSubmit={handleSubmit}
            validationSchema={deliverableValidationSchema}
          >
            <FormField maxLength={255} name="deliverableName" placeholder="Deliverable Name" />
            <Text style={{textAlign: "left", fontSize: 18, color: colors.primary, marginVertical:10}}>Completed</Text>
            <RadioForm
              radio_props={radio_props}
              initial={completed}
              onPress={() => setCompleted(!completed)}
              buttonColor={colors.primary}
              labelColor={colors.primary}
              labelHorizontal={true}
            />
            <FormField maxLength={255} name="courseName" placeholder="Course Name" />
            <Text style={{textAlign: "left", fontSize: 18, color: colors.primary}}>Due At</Text>
            <DateTimePicker
              value={deliverableDueAt}
              title="dueAt" 
              mode="datetime"
              onChange={(event, selectedDate) => setDeliverableDueAt(selectedDate)}/>
            <FormField
              keyboardType="numeric"
              maxLength={3}
              name="grade"
              placeholder="Grade"
              width={200}
            />
            <FormField
              keyboardType="numeric"
              maxLength={3}
              name="weight"
              placeholder="Weight Percentage"
              width={200}
            />
            <SubmitButton title="Create" />
          </Form>
        </ScrollView>
      </View>
    )
  })
  
  return (
    form == "course" ? courseForm(handleSubmit) : form == "deliverable" ? 
      deliverableForm(handleSubmit) : timeSpentForm(handleSubmit)
  )
}

export default ListingEdit;
 