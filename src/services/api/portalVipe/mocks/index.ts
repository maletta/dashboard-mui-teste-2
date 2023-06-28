import { getMeMock, postAuhMock } from './auth';

// self invoking function
// executa todas as requests mockadas dentro do if
(() => {
  console.log('env axios mock', process.env.REACT_APP_IS_AXIOS_MOCK);
  const isAxiosMock = /^TRUE$/i.test(process.env.REACT_APP_IS_AXIOS_MOCK || 'FALSE');
  console.log('const axios mock', isAxiosMock);

  if (isAxiosMock) {
    console.log('deu if ');
    postAuhMock();
    getMeMock();
  } else {
    console.log('deu else ');
  }
})();
