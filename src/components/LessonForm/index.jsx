import React from "react";
import { FastField, Form, Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Button, FormGroup, Spinner, Input } from 'reactstrap';
import FlashCardInput from "../FlashCardInput";
import InputField from "../InputField";

LessonForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

function LessonForm(props) {
  const { initialValues, isAddMode } = props;

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("This field is required.")
  });

  // npm i --save react-select
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={props.onSubmit}
    >
      {(formikProps) => {
        // do something here ...
        const { values, errors, touched, isSubmitting } = formikProps;
        console.log({ values, errors, touched });

        return (
          <Form>
            <FastField
              name="title"
              component={InputField}
              label="Title"
              placeholder="Eg: Animals"
            />

            <FastField
              name="description"
              component={FlashCardInput}
              label="FlashCard"
              placeholder="Eg: A tall nut"
            />

            <FormGroup>
              <Button type="submit" color={isAddMode ? "primary" : "success"}>
                {isSubmitting && <Spinner size="sm" />}
                {isAddMode ? "Add lesson" : "Update lesson"}
              </Button>
            </FormGroup>
          </Form>
        );
      }}
    </Formik>
  );
}

export default LessonForm;
