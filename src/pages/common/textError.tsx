/**
 * TextError is used to display error message
 *
 * @param props is the child error message to render
 */
function TextError(props: any) {
  return <div className="error">{props.children}</div>;
}

export default TextError;
