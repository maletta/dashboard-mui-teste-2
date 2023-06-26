import { AxiosResponse } from 'axios';
import { IUser } from 'context/reducer';
import { IRequest } from 'services/clients/portalVipe/portalVipe';

import { portalVipeClient } from '../../clients/portalVipe';

function getUsers() {
  return portalVipeClient.get<IRequest<IUser>>('/user');
}

function getUser(id: number) {
  return portalVipeClient.get<IRequest<IUser>>(`/user/${id}`);
}

function postUser(user: IUser) {
  return portalVipeClient.post<IRequest<IUser>, AxiosResponse<IUser>, IUser>(`/user`, user);
}

function putUser(id: number, user: IUser) {
  return portalVipeClient.put<IRequest<IUser>, AxiosResponse<IUser>, IUser>(`/user/${id}`, user);
}

function patchUserImage(id: number, data: { img: string }) {
  return portalVipeClient.patch<IRequest<IUser>, AxiosResponse<IUser>, { img: string }>(`/user/${id}`, data);
}

export { getUser, getUsers, patchUserImage, postUser, putUser };
