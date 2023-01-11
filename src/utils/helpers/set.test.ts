import set from "./set";
import { expect } from "chai";

describe('set function', () => {
  it('should return passed object if it not a plain object', () => {
    //arrange
    const obj: any = [];

    //act
    const result = set(obj, 'a.b', 3)

    //assert
    expect(result).to.eq(obj)
  });

  it('should return passed null if null is passed as first argument', () => {
    //arrange

    //act

    //assert
  });

  it('should set new property to passed object with passed value', () => {
    //arrange

    //act

    //assert
  });

  it('should not return new object', () => {
    //arrange

    //act

    //assert
  });
})
