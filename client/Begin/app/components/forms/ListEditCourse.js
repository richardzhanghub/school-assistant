import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import coursesApi from "../../api/courses";
import colors from "../../config/colors";
import { Form, FormField, FormPicker as Picker, SubmitButton } from ".";
import routes from "../../navigation/routes";

function ListingEditCourse({ navigation, course }) {
  const courseForm = () => {
    function courseEdit(editedcourse, { resetForm }) {
      const editCourse = {
        courseNumber: course.course_id,
        courseName: editedcourse.courseName,
        difficulty: editedcourse.difficulty,
        grade: editedcourse.grade,
      };
      const response = coursesApi.editCourse(editCourse);
      navigation.navigate(routes.LISTINGS)
      ;
    }

    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <Form
            initialValues={{
              courseName: course.course_name,
              grade: course.desired_grade.toString(),
              difficulty: course.expected_difficulty.toString(),
            }}
            onSubmit={courseEdit}
          >
             <FormField
              maxLength={255}
              name="courseName"
              placeholder="Course Name"
            />
            <Text
              style={{
                textAlign: "left",
                fontSize: 18,
                color: colors.primary,
                marginVertical: 10,
              }}
            >
              Course Number: {course.course_id}
            </Text>
            <Text
              style={{
                textAlign: "left",
                fontSize: 18,
                color: colors.primary,
                marginVertical: 10,
              }}
            >
              Desired Grade: 
            </Text>
            <FormField
              keyboardType="numeric"
              maxLength={3}
              name="grade"
              width={200}
            />
            <Text
              style={{
                textAlign: "left",
                fontSize: 18,
                color: colors.primary,
                marginVertical: 10,
              }}
            >
              Expected Difficulty (1-5): 
            </Text>
            <FormField
              keyboardType="numeric"
              maxLength={1}
              name="difficulty"
              width={250}
            />
            <SubmitButton title="Edit Course" />
          </Form>
        </ScrollView>
      </View>
    );
  };
  return courseForm()
}

export default ListingEditCourse;
