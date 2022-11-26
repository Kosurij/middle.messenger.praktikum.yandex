import Block from "../../utils/Block";
import template from './button.hbs';
import styles from './button.less';

interface IButtonProps {
  label: string;
  type: string;
  events?: {
    click?: (e?: Event) => void;
  },
  customClass?: string,
}

export default class Button extends Block {
  constructor(props: IButtonProps) {
    super(props);
  }

  render() {
    return this.compile(template, {
      label: this.props.label,
      type: this.props.type,
      events: {
        click: this.props.click,
      },
      styles,
      customClass: this.props.customClass,
    });
  }
}
