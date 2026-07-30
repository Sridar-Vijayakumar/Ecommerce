import { createContext, useState } from "react";

export const AuthContext = createContext();

const getSavedUser = () => {
  try {
    return JSON.parse(localStorage.getItem("userInfo")) || null;
  } catch {
    localStorage.removeItem("userInfo");
    return null;
  }
};

const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(getSavedUser);
 
  const login = (data) => {
    setUserInfo(data);
    localStorage.setItem(
      "userInfo",
      JSON.stringify(data)
    );
  };

  const logout = () => {
    setUserInfo(null);
    localStorage.removeItem("userInfo");
  };

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
