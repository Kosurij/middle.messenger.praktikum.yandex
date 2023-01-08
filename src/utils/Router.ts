import Block from "/src/utils/Block";
import isEqual from "/src/utils/helpers/isEqual";
import { NotFoundPage } from "/src/pages/404/404Page";

function render(query: string, block: Block) {
  const root = document.querySelector(query);

  if (root === null) {
    throw new Error(`Root not found by selector "${query}"`);
  }

  root.innerHTML = '';

  root.append(block.getContent()!);

  return root;
}

class Route {
  private block: Block | null = null;

  constructor(
    private pathname: string,
    private readonly BlockClass: typeof Block,
    private readonly query: string,
  ) {
  }

  leave() {
    this.block = null;
  }

  match(pathname: string) {
    return isEqual(pathname, this.pathname);
  }

  render() {
    if (!this.block) {
      this.block = new this.BlockClass({});

      render(this.query, this.block);
    }
  }
}

class Router {
  private static _instance: Router;

  private routes: Route[] = [];

  private currentRoute: Route | null = null;

  private history = window.history;

  constructor(private readonly rootQuery: string) {
    if (Router._instance) {
      return Router._instance;
    }

    this.routes = [];

    Router._instance = this;
  }

  public use(pathname: string, block: typeof Block) {
    const route = new Route(pathname, block, this.rootQuery);

    this.routes.push(route);

    return this;
  }

  public start() {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window;

      this._onRoute(target.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      new Route(pathname, NotFoundPage, this.rootQuery).render();

      return;
    }

    if (this.currentRoute && !isEqual(this.currentRoute, route)) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;

    this.currentRoute.render();
  }

  public go(pathname: string) {
    this.history.pushState({}, '', pathname);

    this._onRoute(pathname);
  }

  public back() {
    this.history.back();
  }

  public forward() {
    this.history.forward();
  }

  private getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

export default new Router('#app');
