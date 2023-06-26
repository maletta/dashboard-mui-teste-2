import { AxiosResponse } from 'axios';
import { IUser } from 'context/reducer';
import { IRequest } from 'services/clients/portalVipe/portalVipe';

import { portalVipeClient } from '../../clients/portalVipe';

interface IAuth {
  senha: string;
  email: string;
}

function postAuth(auth: IAuth) {
  return portalVipeClient.post<IRequest<{ token: string }>>(`/auth`, auth);
}

function getMe() {
  return portalVipeClient.get<IRequest<IUser>, AxiosResponse<IRequest<IUser>>, IUser>(`/me`);
}

export { getMe, postAuth };
