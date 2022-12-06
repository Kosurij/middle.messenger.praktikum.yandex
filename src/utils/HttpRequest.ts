enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT ='PUT',
  DELETE ='DELETE',
}

interface IOptions {
  method: METHODS;
  timeout?: number;
  headers?: [string, string][];
  data?: Document | XMLHttpRequestBodyInit | null | Record<string, string>;
}

export class HttpRequest {
  request = (url: string, options: IOptions, timeout = 5000) => {
    const { method, headers, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(method, isGet && data ? `${url}${new URLSearchParams(data as Record<string, string>).toString()}` : url);

      if (headers?.length) {
        headers.forEach(([name, val]) => {
          xhr.setRequestHeader(name, val);
        });
      }
      xhr.timeout = timeout;

      xhr.onload = () => resolve(xhr);
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data as Document | XMLHttpRequestBodyInit | null);
      }
    });
  };

  get = (url: string, options: IOptions) => this.request(url, { ...options, method: METHODS.GET }, options.timeout);

  post = (url: string, options: IOptions) => this.request(url, { ...options, method: METHODS.POST }, options.timeout);

  put = (url: string, options: IOptions) => this.request(url, { ...options, method: METHODS.PUT }, options.timeout);

  delete = (url: string, options: IOptions) => this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
}
