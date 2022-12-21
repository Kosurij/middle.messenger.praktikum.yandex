import Block from "/src/utils/Block";
import template from "./chatsList.hbs";
import { IChatInfo } from "/src/types";
import ChatsController from "/src/controllers/ChatsController";
import { Chat } from "./components/Chat/Chat";
import { withStore } from "/src/hocs/withStore";

interface IChatsListProps {
  chats: IChatInfo[];
}

export class ChatsListBase extends Block<IChatsListProps> {
  constructor(props: IChatsListProps) {
    super({...props});
  }

  protected init() {
    this.children.chats = this.createChats(this.props);
  }

  protected componentDidUpdate(oldProps: IChatsListProps, newProps: IChatsListProps): boolean {
    if (oldProps !== newProps) {
      this.children.chats = this.createChats(newProps);

      return true;
    }

    return false
  }

  private createChats(props: IChatsListProps) {
    return props.chats.map(data => {
      return new Chat({
        ...data,
        events: {
          click: () => {
            ChatsController.selectChat(data.id);
          }
        }
      });
    })
  }

  render() {
    return this.compile(template, {});
  }
}

const withChats = withStore((state) => ({chats: [...(state.chats?.data || [])]}));

export const ChatsList = withChats(ChatsListBase);
