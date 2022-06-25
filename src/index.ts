import { loadEnvs } from './tools/envs.tools';
loadEnvs(`${__dirname}/../envs/.env-${process.env.NODE_ENV}`);
import './server';

process.on('uncaughtException', (error: Error) => {
  console.error(`uncaughtException ${error.message}`);
});

process.on('unhandledRejection', (reason: any) => {
  console.error(`unhandledRejection ${reason}`);
});
