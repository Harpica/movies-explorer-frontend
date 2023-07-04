async function checkResponse(res: Response) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(
    new Error(
      await res.json().then((data: { message: string }) => data.message),
    ),
  );
}

export default class ServerInterface {
  protected url: string;

  protected headers: { [key: string]: string };

  private credentials: 'include' | undefined;

  constructor(
    url: string,
    headers: { [key: string]: string },
    credentials?: 'include',
  ) {
    this.url = url;
    this.headers = headers;
    this.credentials = credentials;
  }

  protected async request<T>(url: string, options?: RequestInit): Promise<T> {
    const res = await fetch(url, { ...options, credentials: this.credentials });
    return checkResponse(res);
  }
}
