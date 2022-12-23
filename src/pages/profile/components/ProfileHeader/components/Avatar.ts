import Block from "/src/utils/Block";
import { withStore } from "/src/hocs/withStore";
import template from './avatar.hbs';
import styles from './avatar.less';
import defaultAvatar from "/static/user_avatar.svg";

interface IAvatar {
  avatar: string;
  events: {
    click: () => void;
  }
}

class AvatarBase extends Block<IAvatar> {
  render() {
    return this.compile(template, {
      styles,
      events: this.props.events,
      avatar: this.props?.avatar || defaultAvatar,
    });
  }
}

const withResources = withStore((state) => state.resources);

export const Avatar = withResources(AvatarBase);
