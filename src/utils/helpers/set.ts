import { isPlainObject, TPlainObject } from "/src/utils/helpers/isPlainObject";

function set(object: TPlainObject, path: string, value: any): TPlainObject {
  if (!isPlainObject(object)) {
    return object;
  }

  const array = path.split('.');
  const lastIndex = array.length - 1;

  array.reduce((acc, key, index) => acc[key] = index !== lastIndex ? {} : value, object);

  return object;
}

export default set
