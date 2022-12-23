import { isPlainObject, TPlainObject } from '/src/utils/helpers/isPlainObject';
import merge from '/src/utils/helpers/merge';

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
