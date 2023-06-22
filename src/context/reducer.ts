// enum com todos os tipos de action
export enum IAuthActionKind {
  INITIALIZE = 'INITIALIZE',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
}

// interface para as ações
export interface IAuthAction {
  type: keyof typeof IAuthActionKind;
  payload: IUser | null;
}

export interface IUser {
  nome: string;
  apelido: string;
  email: string;
  avatar: string;
}

export interface IAuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: IUser | null;
}

export function authReducer(state: IAuthState, action: IAuthAction): IAuthState {
  const { payload, type } = action;
  switch (type) {
    case 'INITIALIZE': {
      return {
        ...state,
        ...(payload
          ? {
              isAuthenticated: true,
              isLoading: false,
              user: payload,
            }
          : {
              isLoading: false,
            }),
      };
    }
    case 'SIGN_IN':
      return {
        ...state,
        ...(payload && { ...payload, isAuthenticated: true }),
      };

    case 'SIGN_OUT':
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        user: null,
      };

    default:
      return state;
  }
}
