import Block from "../../utils/Block";
import template from "./inputField.hbs";
import styles from "./inputField.less";
import { inputValidationHandler } from "/src/utils/validation/validatator";

const eventsObject = {
  focusin: inputValidationHandler,
  focusout: inputValidationHandler,
};

interface IInputFieldProps {
  label: string;
  name: string;
  type: string;
  id: string;
  value?: string;
  styles?: Record<string, string>;
  required?: string;
}

export default class InputFiled extends Block {
  constructor(props: IInputFieldProps) {
    super({ ...props, events: eventsObject });
  }

  render() {
    return this.compile(template, {
      label: this.props.label,
      name: this.props.name,
      type: this.props.type,
      id: this.props.id,
      value: this.props.value,
      required: this.props.required,
      title: this.props.title,
      styles,
    });
  }
}
