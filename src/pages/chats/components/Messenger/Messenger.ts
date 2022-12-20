import Block from "/src/utils/Block";
import template from "./messenger.hbs";
import styles from "./messenger.less";
import { MessageForm } from "./components/MessageInputForm/MessageForm";
import { IChatInfo, ID, IMessage } from "/src/types";
import { withStore } from "/src/hocs/withStore";
import defaultChatAvatar from '/static/defaultGroup.svg'
import { Message } from "/src/pages/chats/components/Messenger/components/Message/Message";

interface IMessagesProps {
  selectedChat: number | undefined;
  messages: IMessage[];
  userId: ID;
  chatInfo: IChatInfo;
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
      chatInfo: this.props.chatInfo,
      selectedChat: this.props.selectedChat,
      messages: this.props.messages,
      userId:  this.props.userId,
      styles,
    });
  }
}

const withSelectedChatMessages = withStore(state => {
  const selectedChatId = state.selectedChat;
  const chatInfo = (state.chats || []).filter((chat: IChatInfo) => chat.id === selectedChatId)[0];

  if (!selectedChatId) {
    return {
      messages: [],
      selectedChat: undefined,
      userId: state.user.id,
      chatInfo: {},
    };
  }

  const obj = {
    messages: (state.messages || {})[selectedChatId] || [],
    selectedChat: state.selectedChat,
    userId: state.user.id,
    chatInfo: {...chatInfo, avatar: chatInfo.avatar === null ? defaultChatAvatar : chatInfo.avatar}
  };

  console.log('obj', obj);

  return obj;
});

export const Messenger = withSelectedChatMessages(MessengerBase);
