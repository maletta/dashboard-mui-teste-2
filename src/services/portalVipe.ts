import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import { setupInterceptorsTo } from './interceptors';

export interface IRequest<T> {
  msg: string;
  data: T;
}

const axiosMockInstance = setupInterceptorsTo(
  axios.create({
    baseURL: process.env.REACT_APP_MAIN_API,
  }),
);
const axiosLiveInstance = setupInterceptorsTo(
  axios.create({
    baseURL: process.env.REACT_APP_MAIN_API,
  }),
);

// tempo em milissegundos
const axiosMockAdapterInstance = new AxiosMockAdapter(axiosMockInstance, { delayResponse: 2000 });
const portalVipe = process.env.REACT_APP_IS_AXIOS_MOCK ? axiosMockInstance : axiosLiveInstance;

const addAuthToken = (token: string | null): void => {
  portalVipe.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const removeAuthToken = (): void => {
  portalVipe.defaults.headers.common.Authorization = ``;
};

export { addAuthToken, axiosMockAdapterInstance, portalVipe, removeAuthToken };
