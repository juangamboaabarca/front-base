import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("perfil"))
  );
  const [password, setPassword] = useState(null);
  const [pageSize, setPageSize] = useState(() => localStorage.getItem("pageSize"));
  const [token, setToken] = useState(() => localStorage.getItem("access_token"));
  const [institution, setInstitution] = useState(() =>
    JSON.parse(localStorage.getItem("colegio"))
  );

  const login = (perfil, jwt, institution, pageSize, rawPassword = null) => {
    localStorage.setItem("access_token", jwt);
    localStorage.setItem("perfil", JSON.stringify(perfil));
    localStorage.setItem("colegio", JSON.stringify(institution));
    setUser(perfil);
    setToken(jwt);
    setInstitution(institution);
    setPassword(rawPassword); // solo en memoria
  };
  
  const logout = () => {
    localStorage.clear();
    setUser(null);
    setToken(null);
    setColegio(null);
    setPassword(null); // limpiar también
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ user, token, institution, login, password, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
