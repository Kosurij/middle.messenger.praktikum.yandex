import Block from "/src/utils/Block";
import template from "./profileHeader.hbs";
import styles from "./profileHeader.less";

interface IProfileHeader {
  avatar: string;
  first_name: string;
  events: {
    click: () => void;
  }
}

export class ProfileHeader extends Block<IProfileHeader> {
  constructor(props: IProfileHeader) {
    super(props);
  }

  protected render() {
    return this.compile(template, {
      avatar: this.props.avatar,
      first_name: this.props.first_name,
      styles
    });
  }
}
