export type TPlainObject<T = any> = {
  [k in string]: T;
};

export function isPlainObject(value: unknown): value is TPlainObject {
  return typeof value === 'object'
    && value !== null
    && value.constructor === Object
    && Object.prototype.toString.call(value) === '[object Object]';
}
