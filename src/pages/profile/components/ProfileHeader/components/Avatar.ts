import Block from "/src/utils/Block";
import template from './avatar.hbs'
import styles from './avatar.less'

interface IAvatar {
  avatarPath: string;
  events: {
    click: () => void;
  }
}

export class Avatar extends Block<IAvatar> {
  constructor(props: IAvatar) {
    console.log('props', props);
    super(props);
  }

  render() {
    return this.compile(template, { styles, ...this.props })
  }
}
