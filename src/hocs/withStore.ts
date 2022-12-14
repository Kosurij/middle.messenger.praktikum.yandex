import isEqual from "/src/utils/helpers/isEqual";
import store, { StoreEvents } from "/src/utils/Store";
import { TPlainObject } from "/src/utils/helpers/isPlainObject";
import Block from "/src/utils/Block";

export function withStore(mapStateToProps: (state: any) => any) {
  return function wrapper(Component: typeof Block<any>) {
    type Props = typeof Component extends typeof Block<infer P extends Record<string, any>> ? P : any;

    let currentState: TPlainObject | null = null;

    return class WithStore extends Component {

      constructor(props: Props) {
        const state = store.getState();
        currentState = mapStateToProps(state);

        super({ ...props, ...currentState });

        store.on(StoreEvents.UPDATED, () => {
          const state = store.getState();
          const propsFromState: TPlainObject = mapStateToProps(state);

          if (currentState !== null && !isEqual(currentState, propsFromState)) {
            this.setProps({ ...propsFromState })
          }
        })
      }

    }
  }
}
