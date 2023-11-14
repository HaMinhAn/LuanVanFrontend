import { message } from "antd";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ApiGateway, UserService } from "../service/api";
import { useHistory } from "react-router-dom";
import { useCategory } from "./category";
interface ContextProps {
  login: (username: string, password: string) => void;
  isAdmin: () => void;
  user: string;
}
const Authcontext = createContext({} as ContextProps);
const AuthProvider = (props: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string>("");
  const history = useHistory();
  const { update } = useCategory();

  useEffect(() => {
    if (user) setUser(localStorage.getItem("name") || "");
  }, [user, update]);
  const login = (username: string, password: string) => {
    ApiGateway.post({
      url: "/v1/users/login",
      data: { username: username, password: password },
    })
      .then((res) => {
        ApiGateway.setAuthHeader(res.data.token);
        window.localStorage.setItem("name", res.data.name);
        setUser(res.data.name);
        window.localStorage.setItem("id", res.data.id);
        history.push("/");
      })
      .catch(() => {
        message.error("nhập sai thông tin");
      });
  };
  const isAdmin = () => {
    if (localStorage.getItem("id") != "2") {
      window.location.href = "/";
    }
  };

  return (
    <Authcontext.Provider value={{ login, isAdmin, user }}>
      <>{props.children}</>
    </Authcontext.Provider>
  );
};
const useAuth = () => {
  return useContext(Authcontext);
};
export { AuthProvider, useAuth, Authcontext };
