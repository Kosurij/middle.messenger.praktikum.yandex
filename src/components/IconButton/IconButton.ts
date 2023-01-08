import Block from "/src/utils/Block";
import template from "./iconButton.hbs";
import styles from "./iconButton.less";

interface IIconButtonProps {
  text: string;
  icon: string;
  events?: {
    click?: () => void;
  }
}

class IconButton extends Block<IIconButtonProps> {
  constructor(props: IIconButtonProps) {
    super(props);
  }

  protected render() {
    return this.compile(template, { styles, ...this.props });
  }
}

export default IconButton;
