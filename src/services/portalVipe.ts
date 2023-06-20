import axios, { AxiosRequestConfig } from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import { setupInterceptorsTo } from './interceptors';

const axiosMockInstance = setupInterceptorsTo(axios.create());
const axiosLiveInstance = setupInterceptorsTo(axios.create());

export const axiosMockAdapterInstance = new AxiosMockAdapter(axiosMockInstance, { delayResponse: 0 });
export default process.env.isAxioMock ? axiosMockInstance : axiosLiveInstance;
