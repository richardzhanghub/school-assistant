import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import RadioForm from "react-native-simple-radio-button";
import * as Yup from "yup";
import coursesApi from "../../api/courses";
import deliverableApi from "../../api/deliverable";
import timespentApi from "../../api/timespent";
import colors from "../../config/colors";
import CategoryPickerItem from "../CategoryPickerItem";
import { Form, FormField, FormPicker as Picker, SubmitButton } from ".";
import routes from "../../navigation/routes"

const courseValidationSchema = Yup.object().shape({
  courseName: Yup.string().required().min(1).label("Course name"),
  courseNumber: Yup.number()
    .required()
    .min(1)
    .max(10000)
    .label("Course number"),
  grade: Yup.number().required().min(1).max(100).label("Grade"),
  difficulty: Yup.number().required().min(1).max(5).label("Difficulty"),
});

const deliverableValidationSchema = Yup.object().shape({
  deliverableName: Yup.string().required().min(1).label("Course name"),
  courseName: Yup.string().required().min(1).label("Course name"),
  dueAt: Yup.date().required(),
  grade: Yup.number().min(1).max(100).label("Grade"),
  weight: Yup.number().required().min(1).max(100).label("Difficulty"),
});

const timeSpentValidationSchema = Yup.object().shape({
  courseNumber: Yup.string().required().min(1).label("Course name"),
  note: Yup.string().required(),
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

function ListAdd({ form, navigation }) {
  const [startTime, setStartTime] = useState(new Date(1598051730000));
  const [endTime, setEndTime] = useState(new Date());

  const [completed, setCompleted] = useState(false);
  const [deliverableDueAt, setDeliverableDueAt] = useState(
    new Date(1598051730000)
  );

  const timeSpentForm = () => {
    function timeSpentSubmit(timeSpent, { resetForm }) {
      console.log("Time Spent Form Submitted");
      const newTimeSpent = {
        ended_at: endTime,
        notes: timeSpent.note,
        started_at: startTime,
      };
      const call = timespentApi.addTimeSpent(
        timeSpent.courseNumber,
        newTimeSpent
      );
      call.then((response) => {
        if (response.ok) {
          navigation.navigate(routes.LISTINGS, {updated: newTimeSpent})
        }
      });
    }

    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <Form
            initialValues={{
              courseNumber: "",
              note: "",
            }}
            onSubmit={timeSpentSubmit}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            // validationSchema={timeSpentValidationSchema}
          >
            <FormField
              maxLength={255}
              multiline
              name="courseNumber"
              numberOfLines={3}
              placeholder="Course Code"
            />
            <DateTimePicker
              display="inline"
              style={{ height: 120, width: "60%" }}
              value={startTime}
              title="startTime"
              mode="datetime"
              onChange={(event, selectedDate) => setStartTime(selectedDate)}
            />
            <Text style={{ textAlign: "right", color: colors.primary }}>
              Start Time
            </Text>
            <DateTimePicker
              display="inline"
              style={{ height: 120, width: "60%" }}
              value={endTime}
              title="endTime"
              mode="datetime"
              onChange={(event, selectedDate) => setEndTime(selectedDate)}
            />
            <Text style={{ textAlign: "right", color: colors.primary }}>
              End Time
            </Text>
            <FormField
              maxLength={255}
              multiline
              name="note"
              numberOfLines={3}
              placeholder="Note"
            />
            <SubmitButton title="Add time Spent" />
          </Form>
        </ScrollView>
      </View>
    );
  };

  const courseForm = () => {
    function courseSubmit(course, { resetForm }) {
      const newCourse = {
        courseName: course.courseName,
        courseNumber: course.department.label + course.courseNumber,
        difficulty: course.difficulty,
        grade: course.grade,
      };
      const call = coursesApi.addCourse(newCourse);
      call.then((response) => {
        if (response.ok) {
          navigation.navigate(routes.LISTINGS, {updated: newCourse})
        }
      });
    }

    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <Form
            initialValues={{
              courseName: "",
              courseNumber: "",
              grade: "",
              department: null,
              difficulty: "",
            }}
            onSubmit={courseSubmit}
            // validationSchema={courseValidationSchema}
          >
            <FormField
              maxLength={255}
              name="courseName"
              placeholder="Course Name"
            />
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
            <SubmitButton title="Create Course" />
          </Form>
        </ScrollView>
      </View>
    );
  };

  const deliverableForm = () => {
    var radio_props = [
      { label: "Yes", value: completed },
      { label: "No", value: !completed },
    ];

    function deliverableSubmit(deliverable, { resetForm }) {
      const newDeliverable = {
        completed: completed,
        deliverable_name: deliverable.deliverableName,
        due_at: deliverableDueAt,
        grade: deliverable.grade ? parseInt(deliverable.grade) : deliverable.grade,
        weight: parseInt(deliverable.weight),
      };
      const call = deliverableApi.addDeliverable(deliverable.courseName, newDeliverable);
      call.then((response) => {
        if (response.ok) {
          navigation.navigate(routes.LISTINGS, {updated: deliverable.courseName})
        }
      });
    }

    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <Form
            initialValues={{
              deliverableName: "",
              completed: completed,
              courseName: "",
              dueAt: "",
              grade: "",
              weight: "",
            }}
            onSubmit={deliverableSubmit}
            // validationSchema={deliverableValidationSchema}
          >
            <FormField
              maxLength={255}
              name="deliverableName"
              placeholder="Deliverable Name"
            />
            <Text
              style={{
                textAlign: "left",
                fontSize: 18,
                color: colors.primary,
                marginVertical: 10,
              }}
            >
              Completed
            </Text>
            <RadioForm
              radio_props={radio_props}
              initial={completed}
              onPress={() => setCompleted(!completed)}
              buttonColor={colors.primary}
              labelColor={colors.primary}
              labelHorizontal={true}
            />
            <FormField
              maxLength={255}
              name="courseName"
              placeholder="Course Name"
            />
            <Text
              style={{ textAlign: "left", fontSize: 18, color: colors.primary }}
            >
              Due At
            </Text>
            <DateTimePicker
              value={deliverableDueAt}
              title="dueAt"
              mode="datetime"
              onChange={(event, selectedDate) =>
                setDeliverableDueAt(selectedDate)
              }
            />
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
            <SubmitButton title="Create deliverable" />
          </Form>
        </ScrollView>
      </View>
    );
  };

  return form == "course"
    ? courseForm()
    : form == "deliverable"
    ? deliverableForm()
    : timeSpentForm();
}

export default ListAdd;
