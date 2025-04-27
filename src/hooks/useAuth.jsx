import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
