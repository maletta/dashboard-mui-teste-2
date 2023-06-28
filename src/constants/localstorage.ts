export enum LocalStorageKeysEnum {
  'TOKEN-MAIN-API' = 'TOKEN-MAIN-API',
  'USER-LOGIN' = 'USER-LOGIN',
}

export type LocalStorageKeys = keyof typeof LocalStorageKeysEnum;
