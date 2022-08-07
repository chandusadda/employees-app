import DateView from "react-datepicker";
import { Field, ErrorMessage } from "formik";
import TextError from "./textError";
import { createElement } from "react";
import { Button, IconButton, Tooltip } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

function DatePicker(props: any) {
  const { label, name, ...rest } = props;
  return (
    <div className="form-control">
      <Field name={name}>
        {({ form, field }: any) => {
          const { setFieldValue } = form;
          const { value } = field;
          const ExampleCustomInput = ({
            value,
            onClick,
          }: {
            value: string;
            onClick: (
              event: React.MouseEvent<HTMLButtonElement, MouseEvent>
            ) => void;
          }) => (
            <>
              <Tooltip title={label} placement="top" arrow>
                <Button className="mt-1" onClick={onClick}>
                  {value}
                </Button>
              </Tooltip>
              <Tooltip title={label} placement="top" arrow>
                <IconButton
                  onClick={onClick}
                  aria-label={label}
                  color="primary"
                  className="float-right"
                >
                  <CalendarMonthIcon />
                </IconButton>
              </Tooltip>
            </>
          );
          return (
            <>
              <DateView
                id={name}
                {...field}
                {...rest}
                selected={value}
                onChange={(val) => setFieldValue(name, val)}
                customInput={createElement(ExampleCustomInput)}
              />
            </>
          );
        }}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default DatePicker;
