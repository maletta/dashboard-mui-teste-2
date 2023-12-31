import React, { createContext, Dispatch, useContext, useEffect, useReducer, useRef } from 'react';
import { getMe } from 'services/api/portalVipe';
import { portalVipeClient } from 'services/clients/portalVipe';

import { useLocalStorage } from 'utils/localstorage';

import { authReducer, IAuthAction, IAuthState } from './reducer';

const INITIAL_STATE: IAuthState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

// referências tipagem de dispatch e reducer compostos
// https://dev.to/elisealcala/react-context-with-usereducer-and-typescript-4obm

interface IAuthReducer {
  authState: IAuthState;
  authDispatch: Dispatch<IAuthAction>;
  signIn: (token: string) => void;
  signOut: () => void;
  validateToken: () => void;
}

const AuthContext = createContext<IAuthReducer>({
  authState: INITIAL_STATE,
  authDispatch: () => null,
  signIn: () => undefined,
  signOut: () => undefined,
  validateToken: () => undefined,
});

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, INITIAL_STATE);
  const initialized = useRef(false);
  const localStorage = useLocalStorage();
  const { addAuthToken, removeAuthToken } = portalVipeClient;

  const signOut = () => {
    authDispatch({ type: 'SIGN_OUT', payload: null });
    removeAuthToken();
    localStorage.removeItem('TOKEN-MAIN-API');
  };

  const signIn = (token: string) => {
    localStorage.setItem('TOKEN-MAIN-API', token);
    addAuthToken(token);
    console.log('entrei sign in ', token);
    return getMe()
      .then(({ data: { data } }) => {
        console.log('/me token válido');
        const newUser = {
          nome: data.nome,
          apelido: data.apelido,
          email: data.apelido,
          avatar: data.avatar,
        };
        console.log('new user ', newUser);
        authDispatch({ type: 'SIGN_IN', payload: newUser });
        return Boolean(token);
      })
      .catch(() => {
        return false;
      });
  };

  const validateToken = async () => {
    console.log('validate');
    // evitar de ser chamado 2x em desenvolvimento no modo React.StrictMode
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    const haveToken = localStorage.getItem('TOKEN-MAIN-API');
    addAuthToken(haveToken);

    if (haveToken) {
      getMe()
        .then(({ data: { data } }) => {
          console.log('data from API', data);
          const newUser = {
            nome: data.nome,
            apelido: data.apelido,
            email: data.apelido,
            avatar: data.avatar,
          };
          authDispatch({ type: 'INITIALIZE', payload: newUser });
          console.log('token válido');
        })
        .catch(() => {
          signOut();
          console.log('token inválido catch');
        });
    } else {
      signOut();
    }
  };

  useEffect(() => {
    validateToken();
  }, []);

  return (
    <AuthContext.Provider value={{ authState: authState, authDispatch: authDispatch, signIn, signOut, validateToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
