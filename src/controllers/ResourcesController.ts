import BaseController from "/src/controllers/BaseController";
import store from "/src/utils/Store";
import HTTPTransport from "/src/utils/HTTPTransport";

class ResourcesController extends BaseController {
  protected storePath: string;

  constructor() {
    const storePath = 'resources';

    super(storePath);

    this.storePath = storePath;
  }

  getResources(path: string) {
    const resourceUrl = `${HTTPTransport.API_URL}/resources/${path}`

    store.set(`${this.storePath}.avatar`, resourceUrl);
  }
}

export default new ResourcesController();
