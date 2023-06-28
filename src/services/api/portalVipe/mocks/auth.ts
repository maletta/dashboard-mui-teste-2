/* eslint-disable @typescript-eslint/no-unused-vars */
import { portalVipeClient } from 'services/clients/portalVipe';

function postAuhMock() {
  portalVipeClient.axiosMockAdapterInstance.onPost('/auth').reply(function (config) {
    return [
      // return an array in the form of [status, data, headers]
      200,
      {
        data: {
          token: 'token-teste-123',
        },
      },
    ];
  });
}

function getMeMock() {
  return portalVipeClient.axiosMockAdapterInstance // configurando mock para /me
    .onGet('/me')
    .reply(function (config) {
      return [
        // return an array in the form of [status, data, headers]
        200,
        {
          data: {
            email: 'mauricio.maletta@somosvipe.com.br',
            nome: 'mauricio',
            apelido: 'maleta',
            avatar: 'https://cdn-icons-png.flaticon.com/512/5523/5523674.png',
          },
        },
      ];
    });
}

export { getMeMock, postAuhMock };
