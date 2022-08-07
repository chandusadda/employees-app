import { Button, Grid } from "@mui/material";
import { Formik, Form } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import FormikControl from "./common/formikControls";
import { isValidObject } from "./utils/utils";

// yup scema validation
const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  phoneNumber: yup.string().required("Phone Number is required"),
  homeAddress: yup.object().shape({
    city: yup.string().required("City is required"),
    ZIPCode: yup.string().required("ZIP Code is required"),
    addressLine1: yup.string().required("Address Line1 is required"),
    addressLine2: yup.string(),
  }),
  dateOfEmployment: yup.string().required("Date Of Employment is required"),
  dateOfBirth: yup.string().required("Date Of Birth is required"),
});

const AddEmployee = ({
  hideAddEmployee,
  currentEmpData,
  postEmployeesData,
  setCurrentEmpData,
}: any): JSX.Element => {
  const initialValues = {
    name: "",
    email: "",
    phoneNumber: "",
    homeAddress: {
      city: "",
      ZIPCode: "",
      addressLine1: "",
      addressLine2: "",
    },
    dateOfEmployment: new Date(),
    dateOfBirth: new Date(),
  };
  const [formValues, setFormVals] = useState(null);

  useEffect(() => {
    if (isValidObject(currentEmpData)) {
      const { dateOfEmployment, dateOfBirth } = currentEmpData;
      const newVals = { ...currentEmpData };
      newVals.dateOfEmployment = new Date(dateOfEmployment);
      newVals.dateOfBirth = new Date(dateOfBirth);
      setFormVals(newVals);
    }
  }, [currentEmpData]);

  // will close the add form & resets update data if present
  const cancelForm = (): void => {
    setCurrentEmpData(undefined);
    hideAddEmployee();
  };

  return (
    <div>
      <Formik
        initialValues={formValues || initialValues}
        validationSchema={validationSchema}
        onSubmit={postEmployeesData}
        enableReinitialize
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <Grid container spacing={1}>
              <Grid container item spacing={4} className="mb-2">
                <Grid item xs={3}>
                  <FormikControl
                    control="input"
                    label="Name"
                    name="name"
                    type="text"
                    nested={false}
                    formik={formik}
                  />
                </Grid>
                <Grid item xs={3}>
                  <FormikControl
                    control="input"
                    label="Email"
                    name="email"
                    type="email"
                    nested={false}
                    formik={formik}
                  />
                </Grid>
                <Grid item xs={3}>
                  <FormikControl
                    control="input"
                    label="Phone Number"
                    name="phoneNumber"
                    type="text"
                    nested={false}
                    formik={formik}
                  />
                </Grid>
                <Grid item xs={3}>
                  <FormikControl
                    control="input"
                    label="City"
                    name="homeAddress.city"
                    nested={true}
                    type="text"
                    formik={formik}
                  />
                </Grid>
              </Grid>
              <Grid container item spacing={4} className="mb-2">
                <Grid item xs={3}>
                  <FormikControl
                    control="input"
                    label="ZIP Code"
                    name="homeAddress.ZIPCode"
                    type="text"
                    nested={true}
                    formik={formik}
                  />
                </Grid>
                <Grid item xs={3}>
                  <FormikControl
                    control="input"
                    label="Address Line1"
                    name="homeAddress.addressLine1"
                    type="text"
                    nested={true}
                    formik={formik}
                  />
                </Grid>
                <Grid item xs={3}>
                  <FormikControl
                    control="input"
                    label="Address Line2"
                    name="homeAddress.addressLine2"
                    type="text"
                    nested={true}
                    formik={formik}
                  />
                </Grid>
                <Grid item xs={3}>
                  <FormikControl
                    control="date"
                    label="Date Of Employment"
                    name="dateOfEmployment"
                  />
                </Grid>
              </Grid>
              <Grid container item spacing={4} className="mb-2">
                <Grid item xs={3}>
                  <FormikControl
                    control="date"
                    label="Date Of Birth"
                    name="dateOfBirth"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Button
              className="mt-2"
              data-testid="submitButton"
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Submit
            </Button>
            <Button onClick={cancelForm} className="mt-2">
              Cancel
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddEmployee;
