import axios, { Axios, AxiosRequestConfig, HttpStatusCode } from "axios";
class HostName {
  private readonly client: Axios;
  private setStatis: ((status: HttpStatusCode) => void) | undefined;

  constructor(host: string) {
    this.client = axios.create({
      headers: {
        "Content-Type": "application/json",
      },
      baseURL: host,
    });
  }

  getAuthToken = () => {
    return window.localStorage.getItem("token");
  };

  setAuthHeader = (token: string) => {
    window.localStorage.setItem("token", token);
  };
  buildheaders = (configs?: AxiosRequestConfig) => {
    let configsHeader = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "",
      },
    };
    if (this.getAuthToken() !== null && this.getAuthToken() !== "null") {
      configsHeader.headers.Authorization =
        `Bearer ${this.getAuthToken()}` || "";
    }
    return { ...configsHeader, ...configs };
  };

  get = (props: { url: string; configs?: AxiosRequestConfig }) => {
    return this.client.get(props.url, this.buildheaders(props.configs));
  };

  post = (props: {
    url: string;
    data?: object;
    configs?: AxiosRequestConfig;
  }) => {
    return this.client.post(
      props.url,
      props.data,
      this.buildheaders(props.configs)
    );
  };
  put = (props: {
    url: string;
    data?: object;
    configs?: AxiosRequestConfig;
  }) => {
    return this.client.put(
      props.url,
      props.data,
      this.buildheaders(props.configs)
    );
  };
  delete = (props: { url: string; configs?: AxiosRequestConfig }) => {
    return this.client.delete(props.url, this.buildheaders(props.configs));
  };
}

const UserService = new HostName("http://localhost:9003/api/v1/users/");
const BookService = new HostName("http://localhost:9001/api/book/");
const CartService = new HostName("http://localhost:9004/api/basket/");
const ApiGateway = new HostName("http://localhost:8762/api/");
export { UserService, BookService, CartService, ApiGateway };
