import Block from "../../utils/Block";
import template from "../Link/link.hbs";
import styles from "../Link/link.less";

interface ILinkProps {
  text: string;
  url: string;
  type?: string;
  color?: string;
  customClass?: string;
  events?: {
    click?: (e: Event) => void;
  },
}

export default class Link extends Block {
  constructor(props: ILinkProps) {
    super(props);
  }

  render() {
    return this.compile(template, {
      text: this.props.text,
      url: this.props.url,
      type: this.props.type,
      color: this.props.color,
      customClass: this.props.customClass,
      events: {
        click: this.props.click
      },
      styles
    })
  }
}


