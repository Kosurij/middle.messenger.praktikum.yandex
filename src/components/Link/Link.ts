import Block from "../../utils/Block";
import template from "../Link/link.hbs";
import styles from "../Link/link.less";

interface ILinkProps {
  text: string;
  type: string;
  url: string;
}

export default class Link extends Block {
  constructor(props: ILinkProps) {
    super(props);
  }

  render() {
    return this.compile(template, {
      text: this.props.text,
      type: this.props.type,
      url: this.props.url,
      styles
    })
  }
}


