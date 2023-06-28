/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import { setupInterceptorsTo } from '../interceptors';

export interface IRequest<T> {
  msg: string;
  data: T;
}

// criando cliente de produção e de mock e adicionando interceptors

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

const axiosMockAdapterInstance = new AxiosMockAdapter(axiosMockInstance, { delayResponse: 2000 });
const client = process.env.REACT_APP_IS_AXIOS_MOCK ? axiosMockInstance : axiosLiveInstance;

// configurações para todas as requisições

const addAuthToken = (token: string | null): void => {
  console.log('add auth token ', token);
  client.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const removeAuthToken = (): void => {
  client.defaults.headers.common.Authorization = ``;
};

// acoplando o cliente a VERBOS HTTP

function get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
  return client.get<T, R, D>(url, config);
}

function post<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
  return client.post<T, R, D>(url, data, config);
}

function put<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
  return client.put<T, R, D>(url, data, config);
}

function patch<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
  return client.patch<T, R, D>(url, data, config);
}
export { addAuthToken, axiosMockAdapterInstance, get, patch, post, put, removeAuthToken };
