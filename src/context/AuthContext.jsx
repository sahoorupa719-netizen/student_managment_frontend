import { createContext, useContext, useState } from 'react';
import { login as loginApi, registerStudent } from '../api';

const AuthContext = createContext(null);

const getStoredAuth = () => {
  const storedToken = localStorage.getItem('token');
  try {
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    return storedToken && storedUser
      ? { token: storedToken, user: storedUser }
      : { token: null, user: null };
  } catch {
    return { token: null, user: null };
  }
};

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const storedToken = localStorage.getItem('token');
    return storedToken ? getStoredAuth() : { token: null, user: null };
  });

  const login = async (identifier, password) => {
    const res = await loginApi(identifier, password);
    const data = res.data;

    const userData = {
      id:    data.id,
      name:  data.name,
      role:  data.role?.toLowerCase() || 'student',
      email: data.email || '',
      registration_number: data.registration_number || '',
      teacher_id: data.teacher_id || '',
      department: data.department || '',
      semester: data.semester || '',
      subject: data.subject || '',
      class_name: data.class_name || '',
    };

    const accessToken = data.token || data.access_token;

    if (!accessToken) {
      throw new Error('No token received from server');
    }

    localStorage.setItem('token', accessToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setAuth({ token: accessToken, user: userData });
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuth({ token: null, user: null });
  };

  const signup = async (email, password, name) => {
    const res = await registerStudent({ email, password, name, role: 'student' });
    return res.data;
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout, signup, loading: false }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
