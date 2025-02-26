import { connect, set } from 'mongoose';

set('strictQuery', true);

export const connectToDatabase = async () => {
  try {
    const { MONGODB_URI_PRODUCTION = '' } = process.env;
    const { connection } = await connect(MONGODB_URI_PRODUCTION);

    const { name, host } = connection;

    console.log(`Conectado a la base de datos ${name} en ${host} ✅`);
  } catch (error) {
    console.error('Error al conectar a la base de datos ⛔', error);
  }
};
