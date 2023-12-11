declare module 'react-native-config' {
  export interface NativeConfig {
    ENVIROMENT?: 'DEBUG' | 'RELEASE';
  }

  export const Config: NativeConfig;
  export default Config;
}
