import React, { useState, createContext, useContext } from "react";
const StatusContext = createContext({
  status: Boolean,
  setStatus: () => {},
});
const StatusProvider = ({ children }) => {
  const [status, setStatus] = useState();

  return (
    <StatusContext.Provider value={{ status, setStatus }}>
      <>{children}</>
    </StatusContext.Provider>
  );
};
const useStatus = () => {
  return useContext(StatusContext);
};
export { StatusProvider, useStatus, StatusContext };
