import Block from "/src/utils/Block";
import template from "./dialog.hbs";
import styles from "./dialog.less";

interface IDialog {
  title: string;
  content: Block;
  cancel: Block;
  submit: Block;
  contentFullWidth?: boolean;
  id?: string;
}

class Dialog extends Block<IDialog> {
  constructor(props: IDialog) {
    super(props);
  }

  protected render() {
    return this.compile(template, { styles, ...this.props });
  }
}

export default Dialog;
