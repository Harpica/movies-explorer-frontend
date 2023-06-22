export default class ServerInterface {
  protected url: string;
  protected headers: { [key: string]: string };

  constructor(url: string, headers: { [key: string]: string }) {
    this.url = url;
    this.headers = headers;
  }

  _request<T>(url: string, options?: RequestInit): Promise<T> {
    return fetch(url, { ...options, credentials: 'include' }).then(
      this._checkResponse
    );
  }
  _checkResponse(res: Response) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject({
      status: res.status,
      message: res.json().then((data: { message: string }) => data.message),
    });
  }
}
