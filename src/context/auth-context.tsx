import React, { createContext, Dispatch, useContext, useEffect, useReducer, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { addAuthToken, axiosMockAdapterInstance, portalVipe, removeAuthToken } from 'services/portalVipe';

import { useLocalStorage } from 'utils/localstorage';

import { SplashScreen } from '../containers/DashboardLayout/styles';

import { authReducer, IAuthAction, IAuthState, IUser } from './reducer';

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

interface IRequest<T> {
  msg: string;
  data: T;
}

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // const [authState, authDispatch] = useReducer(authReducer, INITIAL_STATE);
  const [authState, authDispatch] = useReducer(authReducer, INITIAL_STATE);
  const initialized = useRef(false);
  const navigate = useNavigate();

  const signOut = () => {
    authDispatch({ type: 'SIGN_OUT', payload: null });
    removeAuthToken();
    navigate('/');
  };

  const signIn = (token: string) => {
    return portalVipe
      .post<IRequest<IUser>>('/me')
      .then(({ data: { data } }) => {
        console.log('/me token válido');
        addAuthToken(token);
        const newUser = {
          nome: data.nome,
          apelido: data.apelido,
          email: data.apelido,
          avatar: data.avatar,
        };
        authDispatch({ type: 'SIGN_IN', payload: newUser });
        navigate('/dashboard');
      })
      .catch(() => {
        console.log('fala ao sign');
      });
  };

  const validateToken = async () => {
    // evitar de ser chamado 2x em desenvolvimento no modo React.StrictMode
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    try {
      const haveToken = useLocalStorage().getItem('TOKEN-MAIN-API') as string;

      // configurando mock para /me
      axiosMockAdapterInstance.onPost('/me').reply(function (config) {
        return [
          // return an array in the form of [status, data, headers]
          401,
          {
            email: 'mauricio.maletta@somosvipe.com.br',
            nome: 'mauricio',
            apelido: 'maleta',
            avatar: 'https://cdn-icons-png.flaticon.com/512/5523/5523674.png',
          },
        ];
      });

      portalVipe
        .post<IRequest<IUser>>('/me')
        .then(({ data: { data } }) => {
          addAuthToken(haveToken);
          const newUser = {
            nome: data.nome,
            apelido: data.apelido,
            email: data.apelido,
            avatar: data.avatar,
          };
          authDispatch({ type: 'SIGN_IN', payload: newUser });
          navigate('/dashboard');
        })
        .catch(() => {
          signOut();
          navigate('/');
        });
    } catch (err) {
      console.error('Token não existe no localstorage ', err);
      signOut();
    }
  };

  useEffect(() => {
    validateToken();
  }, []);

  return <AuthContext.Provider value={{ state: authState, dispatch: authDispatch }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
