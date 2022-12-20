import Block from "/src/utils/Block";
import template from "./messenger.hbs";
import styles from "./messenger.less";
import { MessageForm } from "./components/MessageInputForm/MessageForm";
import { ID, IMessage } from "/src/types";
import { withStore } from "/src/hocs/withStore";
import { Message } from "/src/pages/chats/components/Messenger/components/Message/Message";

interface IMessagesProps {
  // userName: string;
  // date: string | Date;
  // userAvatar: string;
  selectedChat: number | undefined;
  messages: IMessage[];
  userId: ID;
}

export class MessengerBase extends Block<IMessagesProps> {
  constructor(props: IMessagesProps) {
    super(props);
  }

  protected init() {
    this.children.messages = this.createMessages(this.props);

    this.children.messageForm = new MessageForm();
  }

  protected componentDidUpdate(oldProps: IMessagesProps, newProps: IMessagesProps): boolean {
    if (oldProps !== newProps) {
      this.children.messages = this.createMessages(newProps);

      return true;
    }

    return false
  }

  private createMessages(props: IMessagesProps) {
    return props.messages.map(data => {
      return new Message({...data, isMine: props.userId === data.user_id });
    })
  }

  protected render() {
    return this.compile(template, {
      // userName: this.props.userName,
      // userAvatar: this.props.userAvatar,
      messages: this.props.messages,
      styles,
    });
  }
}

const withSelectedChatMessages = withStore(state => {
  const selectedChatId = state.selectedChat;

  if (!selectedChatId) {
    return {
      messages: [],
      selectedChat: undefined,
      userId: state.user.id
    };
  }

  return {
    messages: (state.messages || {})[selectedChatId] || [],
    selectedChat: state.selectedChat,
    userId: state.user.id
  };
});

export const Messenger = withSelectedChatMessages(MessengerBase);
