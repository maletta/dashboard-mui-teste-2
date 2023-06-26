import { portalVipeClient } from 'services/clients/portalVipe';

// configurando mock para /me
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
