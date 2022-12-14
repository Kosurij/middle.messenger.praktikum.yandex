import store from "/src/utils/Store";

export default class BaseController {
  protected readonly storePath: string;

  constructor(path: string) {
    this.storePath = path
  }

  async makeRequest(callback: () => void) {
    try {
      store.set(`${this.storePath}.isLoading`, true)

      await callback();

      store.set(`${this.storePath}.error`, null)
    } catch (e) {
      store.set(`${this.storePath}.error`, e)
    } finally {
      store.set(`${this.storePath}.isLoading`, false)
    }
  }
}
