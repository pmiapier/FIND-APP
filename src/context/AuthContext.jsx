import { useState, createContext, useEffect } from 'react';
import axios from '../config/axios';

import { addAccessToken, getAccessToken, removeAccessToken } from '../utils/local-storage';

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (getAccessToken()) {
      axios
        .get('auth/me')
        .then((res) => {
          setAuthUser(res.data.user);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const register = async (registerInputObject) => {
    const res = await axios.post('/auth/register', registerInputObject);
    addAccessToken(res.data.TOKEN);
    setAuthUser(res.data.user);
  };

  const login = async (credential) => {
    const res = await axios.post('auth/login', credential);
    addAccessToken(res.data.TOKEN);
    setAuthUser(res.data.user);
  };

  const logout = () => {
    removeAccessToken();
    setAuthUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        register,
        login,
        isLoading,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
