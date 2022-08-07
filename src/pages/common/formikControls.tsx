import DatePicker from "./datePicker";
import InputField from "./inputField";

/**
 * FormikControl is used to get input fields
 *
 * @param props will have all props of input
 */
function FormikControl(props: any): JSX.Element | null {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <InputField {...rest} />;
    case "date":
      return <DatePicker {...rest} />;
    default:
      return null;
  }
}

export default FormikControl;
