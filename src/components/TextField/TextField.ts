import Block from "../../utils/Block";
import template from "../TextField/textField.hbs";
import styles from "../TextField/textField.less";

interface ITextFieldProps {
  label: string;
  value: string;
}

export default class TextField extends Block {
  constructor(props: ITextFieldProps) {
    super(props);
  }

  render() {
    return this.compile(template, {
      label: this.props.label,
      value: this.props.value,
      styles
    })
  }
}
