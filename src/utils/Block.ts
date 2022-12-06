import { nanoid } from "nanoid";
import EventBus from "./EventBus";

type BlockEvents<P = any> = {
  'init': [];
  'flow:component-did-mount': [];
  'flow:component-did-update': [P, P];
  'flow:render': [];
}

type Props<P extends Record<string, unknown> = any> = { events?: Record<string, () => void> } & P;

export default class Block<P extends Record<string, unknown> = any> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  } as const;

  public id = nanoid(6);

  protected props: Props<P>;

  public children: Record<string, Block<P>> | Record<string, Block<P>[]>;

  private eventBus: () => EventBus<BlockEvents<Props<P>>>;

  private _element: HTMLElement | null = null;

  constructor(propsAndChildren: Props<P> = {} as Props<P>) {
    const eventBus = new EventBus<BlockEvents<Props<P>>>();

    const { props, children } = this.getChildrenAndProps(propsAndChildren);

    this.children = children;

    this.props = this._makePropsProxy(props);

    this.initChildren();

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  private _addEvents(): void {
    const { events = {} } = this.props;

    if (!events) {
      return;
    }

    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  private _removeEvents(): void {
    const { events = {} } = this.props;

    if (!events || !this._element) {
      return;
    }

    Object.keys(events).forEach((eventName) => {
      this._element?.removeEventListener(eventName, events[eventName]);
    });
  }

  private getChildrenAndProps(propsAndChildren: Props<P>): { props: Props<P>, children: Record<string, Block> } {
    const props: Record<string, unknown> = {};
    const children: Record<string, Block> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value) && value.every((v) => v instanceof Block)) {
        props[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { props: props as Props<P>, children };
  }

  protected initChildren(): void {}

  private _registerEvents(eventBus: EventBus<BlockEvents>): void {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _init(): void {
    this.init();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init(): void {}

  private _componentDidMount(): void {
    this.componentDidMount();
  }

  protected componentDidMount(): void {}

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);

    Object.values(this.children).forEach((child) => child.dispatchComponentDidMount());
  }

  private _componentDidUpdate(oldProps: Props<P>, newProps: Props<P>): void {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate(oldProps: Props<P>, newProps: Props<P>): boolean {
    return oldProps !== newProps;
  }

  public setProps = (nextProps: Partial<Props<P>>) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  protected get element(): typeof this._element {
    return this._element;
  }

  private _render(): void {
    const fragment = this.render();

    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element) {
      this._removeEvents();
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this._addEvents();
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  public getContent() {
    return this.element;
  }

  private _makePropsProxy(props: Props<P>) {
    const self = this;

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop as string];

        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        const oldTarget = { ...target };

        target[prop as keyof Props<P>] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);

        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  private _createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }

  protected show() {
    this.getContent()!.style.display = "block";
  }

  protected hide() {
    this.getContent()!.style.display = "none";
  }

  compile(template: (ctx: any) => string, context: any) {
    const contextAndStubs = { ...context };

    Object.entries(this.children).forEach(([name, child]) => {
      if (Array.isArray(child)) {
        contextAndStubs[name] = child.map((ch) => `<div data-id=id-${ch.id}></div>`);

        return;
      }

      contextAndStubs[name] = `<div data-id=id-${child.id}></div>`;
    });

    const htmlString = template(contextAndStubs);

    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;

    fragment.innerHTML = htmlString;

    Object.entries(this.children).forEach(([_, child]) => {
      if (Array.isArray(child)) {
        child.forEach((ch) => {
          const stub = fragment.content.querySelector(`[data-id='id-${ch.id}']`);

          if (stub) {
            stub.replaceWith(ch.getContent());
          }
        });

        return fragment.content;
      }

      const stub = fragment.content.querySelector(`[data-id='id-${child.id}']`);

      if (!stub) {
        return;
      }

      stub.replaceWith(child.getContent()!);
    });

    return fragment.content;
  }
}
