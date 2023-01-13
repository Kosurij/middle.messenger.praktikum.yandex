import { expect } from 'chai';
import sinon from 'sinon';
import { BaseLink as Link } from "./Link";

describe('Link', () => {
  let routerMock: any;

  beforeEach(() => {
    routerMock = {
      go: sinon.fake(),
    };
  });

  it('should render', () => {
    new Link({ to: '/', text: 'test', router: routerMock });
  });

  it('element should return anchor tag', () => {
    const link = new Link({ to: '/', text: 'test', router: routerMock });

    const element = link.getContent();

    expect(element).to.be.instanceof(window.HTMLAnchorElement);
  });

  it('should go to passed route on click', () => {
    const to = "/path";

    const link = new Link({
      text: "test",
      to,
      router: routerMock,
    });

    const element = link.getContent() as HTMLAnchorElement;

    element.click();

    expect(routerMock.go.firstArg).to.eq(to);
  });
});
