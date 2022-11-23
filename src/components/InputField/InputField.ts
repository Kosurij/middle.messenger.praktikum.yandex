import Block from "../../utils/Block";
import template from "../InputField/inputField.hbs";
import styles from "../InputField/inputField.less";

interface IInputFieldProps {
  label: string;
  name: string;
  type: string;
  id: string;
  value?: string;
  styles?: Record<string, string>;
}


export default class InputFiled extends Block {
  constructor(props: IInputFieldProps) {
    super(props);
  }

  render() {
    return this.compile(template, {
      label: this.props.label,
      name: this.props.name,
      type: this.props.type,
      id: this.props.id,
      value: this.props.value,
      styles
    })
  }
}



