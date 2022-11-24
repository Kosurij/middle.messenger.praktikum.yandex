import EventBus from "./EventBus";
import { nanoid } from "nanoid";

export default class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

  public id = nanoid(6);
  protected props: any;
  protected children: Record<string, Block>
  private eventBus: () => EventBus;
  private _element: HTMLElement | null = null;
  private readonly _meta: { props: any };

  constructor(propsAndChildren: any = {}) {
    const eventBus = new EventBus();

    const { props, children } = this.getChildrenAndProps(propsAndChildren);

    this.children = children;


    this._meta = {
      props
    };

    this.props = this._makePropsProxy(props);

    this.initChildren();

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _addEvents() {
    const events: Record<string, () => void> = this.props.events;

    if (!events) {
      return;
    }

    Object.keys(events).forEach(eventName => {
      this._element?.addEventListener(eventName, events[eventName]);
    });

  }

  private _removeEvents() {
    const events: Record<string, () => void> = this.props.events;

    if (!events || !this._element) {
      return
    }

    Object.keys(events).forEach(eventName => {
      this._element?.removeEventListener(eventName, events[eventName]);
    });
  }

  private getChildrenAndProps(propsAndChildren: any) {
    const props: Record<string, any> = {};
    const children: Record<string, Block> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { props, children };
  }

  protected initChildren() {}

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  protected init() {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount() {
    this.componentDidMount();
  }

  protected componentDidMount() {}

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: any, newProps: any) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
    }
  }

  protected componentDidUpdate(oldProps: any, newProps:any): boolean {
    return oldProps !== newProps;
  }

  public setProps = (nextProps: any) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  protected get element() {
    return this._element;
  }

  private _render() {
    const fragment = this.render();

    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element) {
      this._removeEvents();
      this._element.replaceWith(newElement);
    }

    this._element = newElement

    this._addEvents();
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  public getContent() {
    return this.element;
  }

  private _makePropsProxy(props: any) {
    const self = this;

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        const oldTarget = { ...target};
        target[prop] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      }
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
    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        context[key] = child.map(ch => `<div data-id=id-${ch.id}></div>`)

        return;
      }

      context[key] = `<div data-id=id-${child.id}></div>`
    })

    const htmlString = template(context);

    fragment.innerHTML = htmlString;

    Object.entries(this.children).forEach(([, child]) => {
      if (Array.isArray(child)) {
        child.forEach(ch => {
          const stub = fragment.content.querySelector(`[data-id='id-${ch.id}']`)

          if (stub) {
            stub.replaceWith(ch.getContent())
          }
        })

        return fragment.content;
      }

      const stub = fragment.content.querySelector(`[data-id='id-${child.id}']`)

      if (!stub) {
        return;
      }

      stub.replaceWith(child.getContent()!);
    })

    return fragment.content;
  }
}
