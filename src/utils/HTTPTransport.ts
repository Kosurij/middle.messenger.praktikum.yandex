import { queryStringify } from "/src/utils/helpers/queryStringify";

enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT ='PUT',
  DELETE ='DELETE',
}

type TData = Document | XMLHttpRequestBodyInit | Record<string, any>;

interface IOptions {
  method: METHODS;
  data?: TData
}

export default class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2';

  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  private request<Response>(url: string, options: IOptions = { method: METHODS.GET }): Promise<Response> {
    const { method, data } = options;

    const isQueryParameters = method === METHODS.GET && !!data && typeof data === 'object';

    const resultUrl = isQueryParameters ? `${url}${queryStringify(data)}` : url;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);

      xhr.open(method, resultUrl);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.timeout = 5000;
      xhr.onabort = () => reject({ reason: 'Aborted' });
      xhr.onerror = () => reject({ reason: 'Network error' });
      xhr.ontimeout = () => reject({ reason: 'Timeout' });

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (!(data instanceof FormData)) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data instanceof FormData ? data : JSON.stringify(data));
      }
    });
  };

  public get<Response>(path = '', data?: TData): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: METHODS.GET,
      data,
    });
  };

  public post<Response = void>(path: string, data?: TData): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: METHODS.POST,
      data,
    });
  };

  public put<Response = void>(path: string, data: TData): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: METHODS.PUT,
      data,
    });
  };

  public delete<Response = void>(path: string, data?: TData): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: METHODS.DELETE,
      data,
    });
  };
}
