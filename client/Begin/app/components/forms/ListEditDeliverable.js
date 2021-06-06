import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import RadioForm from "react-native-simple-radio-button";
import deliverableApi from "../../api/deliverable";
import colors from "../../config/colors";
import { Form, FormField, FormPicker as Picker, SubmitButton } from ".";
import routes from "../../navigation/routes";

function ListEditDeliverable({ navigation, deliverable, courseId }) {
  const [completed, setCompleted] = useState(deliverable.completed);
  const [deliverableDueAt, setDeliverableDueAt] = useState(
    new Date(deliverable.due_at)
  );
  console.log("hello",courseId)
  console.log(deliverable)
  const deliverableForm = () => {
    var radio_props = [
      { label: "Yes", value: completed },
      { label: "No", value: !completed },
    ];

    function deliverableEdit(changedDeliverable, { resetForm }) {
      const editDeliverable = {
        completed: completed,
        deliverable_id: deliverable.deliverable_id,
        deliverable_name: changedDeliverable.deliverableName,
        due_at: deliverableDueAt,
        grade: changedDeliverable.grade ? parseInt(changedDeliverable.grade) : changedDeliverable.grade,
        weight: parseInt(changedDeliverable.weight),
      };
      const call = deliverableApi.editDeliverable(courseId, editDeliverable);
      call.then((response) => {
        if (response.ok) {
          navigation.navigate(routes.LISTINGS, {updated: editDeliverable})
        }
      });
    }

    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <Form
            initialValues={{
              deliverableName: deliverable.deliverable_name,
              completed: deliverable.completed,
              dueAt: deliverable.due_at,
              grade: deliverable.grade ? deliverable.grade.toString() : deliverable.grade,
              weight: deliverable.weight.toString()
            }}
            onSubmit={deliverableEdit}
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
            <SubmitButton title="Edit deliverable" />
          </Form>
        </ScrollView>
      </View>
    );
  };
  return deliverableForm()
}

export default ListEditDeliverable;
