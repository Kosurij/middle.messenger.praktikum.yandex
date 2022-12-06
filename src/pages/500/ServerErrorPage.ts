import Block from "/src/utils/Block";
import { Link } from '../../components';
import template from './500.hbs';
import styles from './500.less';
import { ChatsPage } from "/src/pages/chats/ChatsPage";
import { renderDOM } from "/src/utils/renderDOM";

export class ServerErrorPage extends Block {
  protected initChildren() {
    this.children.homeLink = new Link({
      text: 'Назад к чатам',
      url: '/chats',
      events: {
        click: (e) => {
          const chatsPage = new ChatsPage();

          e.preventDefault();

          renderDOM(chatsPage);
        },
      },
    });
  }

  protected render() {
    return this.compile(template, { styles });
  }
}
