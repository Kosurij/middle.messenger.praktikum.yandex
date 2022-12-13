import Block from "../../utils/Block";
import { PropsWithRouter, withRouter } from "/src/hocs/withRouter";
import template from "./link.hbs";
import styles from "./link.less";

interface ILinkProps extends PropsWithRouter {
  text: string;
  to: string;
  type?: 'medium | large';
  color?: string;
  customClass?: string;
  events?: {
    click?: (e?: Event) => void;
  },
}

class BaseLink extends Block<ILinkProps> {
  constructor(props: ILinkProps) {
    super({
      ...props,
      events: {
        click: (e) => {
          e!.preventDefault();

          this.navigate()
        }
      },
    });
  }

  navigate() {
    this.props.router.go(this.props.to);
  }

  render() {
    return this.compile(template, {
      text: this.props.text,
      to: this.props.to,
      type: this.props.type,
      color: this.props.color,
      customClass: this.props.customClass,
      styles,
    });
  }
}

const Link = withRouter(BaseLink);

export default Link;
