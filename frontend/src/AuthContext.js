import React, { createContext, useContext, useState, useEffect } from 'react';
import querystring from 'query-string';

const AuthContext = createContext();
const params = querystring.parse(window.location.search);
const Idloged = params.username;
export function AuthProvider({ children }) {
    const [userId, setUserId] = useState('');

    useEffect(() => {
        if (Idloged) {
          setUserId(Idloged);
        }
        else {
          window.location.replace('http://localhost:5000/login');
        }
      }, []);
      return (
        <AuthContext.Provider value={{ userId, setUserId }}>
          {children}
        </AuthContext.Provider>
      );
}

export function useAuth() {
    return useContext(AuthContext);
  }
