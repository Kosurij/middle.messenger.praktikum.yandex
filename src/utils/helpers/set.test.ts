import { expect } from "chai";
import set from "./set";
import { TPlainObject } from "./isPlainObject";

describe('set function', () => {
  let obj: TPlainObject = {};
  const path = 'a.b';
  const value = 'value';

  beforeEach(() => {
    obj = {};
  });

  it('should return passed object if it not a plain object', () => {
    obj = [];

    const result = set(obj, path, value);

    expect(result).to.eq(obj);
  });

  it('should set new property to passed object with passed value', () => {
    set(obj, path, value);

    expect(obj.a.b).to.eq(value);
  });
});
