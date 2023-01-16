import Block from "../../utils/Block";
import template from "./inputField.hbs";
import styles from "./inputField.less";
import { inputValidationHandler } from "../../utils/validation/validatator";

const eventsObject: Record<string, any> = {
  focusin: inputValidationHandler,
  focusout: inputValidationHandler,
};

interface IInputFieldProps {
  label: string;
  name: string;
  type: string;
  id: string;
  value?: string;
  accept?: string;
  customClass?: string;
}

export default class InputFiled extends Block<IInputFieldProps> {
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
      accept: this.props.accept,
      customClass: this.props.customClass,
      styles,
    });
  }
}
