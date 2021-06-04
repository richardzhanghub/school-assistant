import { useFormikContext } from "formik";
import React from "react";
import TextInput from "../TextInput";
import ErrorMessage from "./ErrorMessage";
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native'

function AppFormField({ name, width, ...otherProps }) {
  const {
    setFieldTouched,
    setFieldValue,
    errors,
    touched,
    values,
  } = useFormikContext();

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View>
        <TextInput
          onBlur={() => setFieldTouched(name)}
          onChangeText={(text) => setFieldValue(name, text)}
          value={values[name]}
          width={width}
          {...otherProps}
        />
        <ErrorMessage error={errors[name]} visible={touched[name]} />
      </View>
    </TouchableWithoutFeedback>
  );
}

export default AppFormField;
