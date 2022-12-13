import { TPlainObject } from "/src/utils/helpers/isPlainObject";

function merge(lhs: TPlainObject, rhs: TPlainObject): TPlainObject {
  for (let p in rhs) {
    if (!rhs.hasOwnProperty(p)) {
      continue;
    }

    try {
      if (rhs[p].constructor === Object) {
        rhs[p] = merge(lhs[p] as TPlainObject, rhs[p] as TPlainObject);
      } else {
        lhs[p] = rhs[p];
      }
    } catch(e) {
      lhs[p] = rhs[p];
    }
  }

  return lhs;
}

export default merge
