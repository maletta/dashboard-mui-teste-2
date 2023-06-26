import { portalVipeClient } from 'services/clients/portalVipe';

portalVipeClient.axiosMockAdapterInstance // configurando mock para /me
  .onPost('/me')
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
