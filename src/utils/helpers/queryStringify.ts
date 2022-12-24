export function queryStringify(data: Record<string, any>): string {
  if (typeof data !== "object") {
    throw new Error("Data must be object");
  }

  const keys = Object.keys(data);

  if (!keys.length) {
    return '';
  }

  return keys.reduce(
    (result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? "&" : ""}`,
    "?",
  );
}
