import { isPlainObject, TPlainObject } from './isPlainObject';
import merge from './merge';

function set(object: TPlainObject, path: string, value: any): TPlainObject {
  if (!isPlainObject(object)) {
    return object;
  }

  const result = path.split('.').reduceRight<TPlainObject>((acc, key) => ({
    [key]: acc,
  }), value as any);

  return merge(object as TPlainObject, result);
}

export default set;
