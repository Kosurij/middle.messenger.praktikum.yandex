import EventBus from "/src/utils/EventBus";
import set from '/src/utils/helpers/set'

type TStoreEvents = {
  updated: [];
}

export const StoreEvents = {
  UPDATED: 'updated'
} as const;

class Store extends EventBus<TStoreEvents> {
  private state: any = {};

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
