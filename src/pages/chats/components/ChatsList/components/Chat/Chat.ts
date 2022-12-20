import Block from "/src/utils/Block";
import template from './chat.hbs';
import styles from './chat.less';
import { withStore } from "/src/hocs/withStore";
import { IChatInfo, ID } from "/src/types";

interface IChatProps {
  id: ID;
  title: string;
  unread_count: number;
  selectedChat: IChatInfo;
  events: {
    click: () => void;
  }
}

class ChatBase extends Block<IChatProps> {
  constructor(props: IChatProps) {
    super(props);
  }

  protected render() {
    return this.compile(template, {
      ...this.props, isSelected: this.props.id === this.props.selectedChat?.id,
      styles});
  }
}

export const withSelectedChat = withStore(state => ({selectedChat: (state.chats || []).find(({id}: IChatInfo) => id === state.selectedChat)}));

export const Chat = withSelectedChat(ChatBase);
