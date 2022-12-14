import { isPlainObject, TPlainObject } from "/src/utils/helpers/isPlainObject";

function isArrayOrObject(value: unknown): value is [] | TPlainObject {
  return isPlainObject(value) || Array.isArray(value);
}

function isEqual(lhs: TPlainObject | string, rhs: TPlainObject | string) {
  if (typeof lhs === 'string' && typeof rhs === 'string') {
    return lhs === rhs;
  }

  if (isPlainObject(lhs) && isPlainObject(rhs)) {
    if (Object.keys(lhs).length !== Object.keys(rhs).length) {
      return false;
    }

    for (const [key, value] of Object.entries(lhs)) {
      const rightValue = rhs[key];
      if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
        if (isEqual(value, rightValue)) {
          continue;
        }
        return false;
      }

      if (value !== rightValue) {
        return false;
      }
    }

    return true;
  }
}

export default isEqual
