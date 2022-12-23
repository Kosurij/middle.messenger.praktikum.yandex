import EventBus from "/src/utils/EventBus";
import set from '/src/utils/helpers/set'
import { IChatInfo, IMessage, IUser } from "/src/types";

type TStoreEvents = {
  updated: [];
}

export const StoreEvents = {
  UPDATED: 'updated'
} as const;

interface IStore {
  user: IUser;
  chats?: {
    data: IChatInfo[];
    error: null | Error,
    isLoading: boolean;
  };
  messages?: Record<number, IMessage[]>;
  selectedChat?: number;
  resources? : {
    avatar?: string
  }
}

class Store extends EventBus<TStoreEvents> {
  private state: IStore = {} as IStore;

  public set(path: string, data: unknown) {
    set(this.state, path, data);

    this.emit(StoreEvents.UPDATED, this.getState())
  }

  public getState() {
    return this.state;
  }
}

const store = new Store();

export default store;
