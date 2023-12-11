import Config from 'react-native-config';
import {consoleTransport, logger} from 'react-native-logs';
const loggerConfig = {
  severity: 'debug',
  transport: consoleTransport,
  transportOptions: {
    colors: {
      info: 'blueBright',
      warn: 'yellowBright',
      error: 'redBright',
      debug: 'green',
    },
  },
  async: false,
  dateFormat: 'time',
  printLevel: true,
  printDate: true,
  enabled: true,
};
const theLogger = logger.createLogger(loggerConfig);
export function log(...texts: Array<any>) {
  if (Config.ENVIROMENT === 'DEBUG') {
    theLogger.debug(...texts);
  }
}
export function errorLog(...texts: Array<any>) {
  if (Config.ENVIROMENT === 'DEBUG') {
    theLogger.error(...texts);
  }
}
