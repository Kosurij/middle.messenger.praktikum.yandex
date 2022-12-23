import store from "/src/utils/Store";
import { errorReducer } from "/src/reducers";

export default class BaseController {
  protected readonly storePath: string;

  protected readonly notificationText?: string;

  protected readonly notification = document.querySelector(".notification") as HTMLElement;

  constructor(path: string, text?: string) {
    this.storePath = path;
    this.notificationText = text;
  }

  notificationInit() {
    this.notification.style.display = "none";
  }

  notificationSuccess() {
    if (this.notificationText) {
      this.notificationInit();

      this.notification.textContent = this.notificationText;

      this.notification.style.display = "block";

      setTimeout(() => {
        this.notificationInit();
      }, 3000);
    }
  }

  notificationError() {
    this.notificationInit();

    const { reason } = errorReducer(store.getState());

    this.notification.classList.add('notification-error');

    this.notification.textContent = reason;

    this.notification.style.display = "block";

    setTimeout(() => {
      this.notificationInit();

      this.notification.classList.remove('notification-error');
    }, 3000);
  }

  async makeRequest(callback: () => void) {
    this.notification.style.display = "none";

    try {
      store.set(`${this.storePath}.isLoading`, true);

      await callback();

      store.set(`${this.storePath}.error`, null);
      this.notificationSuccess();
    } catch (e) {
      store.set(`error`, e);
      this.notificationError();
    } finally {
      store.set(`${this.storePath}.isLoading`, false);
    }
  }
}
