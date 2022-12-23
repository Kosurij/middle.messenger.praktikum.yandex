import Block from "/src/utils/Block";
import template from "./messenger.hbs";
import styles from "./messenger.less";
import { MessageForm } from "./components/MessageInputForm/MessageForm";
import { IChatInfo, ID, IMessage } from "/src/types";
import { withStore } from "/src/hocs/withStore";
import defaultChatAvatar from '/static/defaultGroup.svg'
import { Message } from "/src/pages/chats/components/Messenger/components/Message/Message";
import { Button } from "/src/components";
import Dropdown from "./components/Dropdown/Dropdown";

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

    this.children.dropdown = new Dropdown({
      element: new Button({
        label: '',
        type: 'button',
        customClass: 'toolbar__actionButton__button',
        events: {
          click: () => this.toggleDropdown()
        }
      })
    })

    this.children.messageForm = new MessageForm();
  }

  toggleDropdown() {
    const content = document.querySelector('.dropdown-content');

    content!.classList.toggle('visible')
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
      return new Message({
        ...data,
        isMine: props.userId === data.user_id,
        time: `${new Date(data.time).getHours()}:${new Date(data.time).getMinutes()}`
      });
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
  const chatInfo = (state.chats?.data || []).filter((chat: IChatInfo) => chat.id === selectedChatId)[0];

  if (!selectedChatId) {
    return {
      messages: [],
      selectedChat: undefined,
      userId: state.user.data.id,
      chatInfo: {},
    };
  }

  return {
    messages: (state.messages || {})[selectedChatId] || [],
    selectedChat: state.selectedChat,
    userId: state.user.data.id,
    chatInfo: {...chatInfo, avatar: chatInfo.avatar === null ? defaultChatAvatar : chatInfo.avatar}
  };
});

export const Messenger = withSelectedChatMessages(MessengerBase);
