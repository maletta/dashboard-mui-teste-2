import React, { createContext, Dispatch, useContext, useEffect, useReducer, useRef } from 'react';

import { authReducer, IAuthAction, IAuthState } from './reducer';

const INITIAL_STATE: IAuthState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

// referências tipagem de dispatch e reducer compostos
// https://dev.to/elisealcala/react-context-with-usereducer-and-typescript-4obm
interface IAuthReducer {
  state: IAuthState;
  dispatch: Dispatch<IAuthAction>;
}

// export const AuthContext = React.createContext<IAuthState | null>(INITIAL_STATE);
export const AuthContext = createContext<IAuthReducer>({
  state: INITIAL_STATE,
  dispatch: () => null,
});

const setBearerToken = (token: string) => console.log('DEFININDO BEARER TOKEN ', token);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // const [authState, authDispatch] = useReducer(authReducer, INITIAL_STATE);
  const [authState, authDispatch] = useReducer(authReducer, INITIAL_STATE);
  const initialized = useRef(false);

  const initialize = async () => {
    // evitar de ser chamado 2x em desenvolvimento no modo React.StrictMode
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = null;

    try {
      isAuthenticated = window.sessionStorage.getItem('token-main-api') === 'meu token velho';
    } catch (err) {
      console.error('Erro ao acessar localstorage ', err);
    }

    const receivedUser = {
      nome: 'novoUsuario',
    };

    authDispatch({ type: 'INITIALIZE', payload: receivedUser || null });

    setBearerToken('meu token novo');
  };

  useEffect(() => {
    initialize();
  }, []);

  return <AuthContext.Provider value={{ state: authState, dispatch: authDispatch }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
