import { app } from './server.js';
import { connectToDatabase } from './database.js';
import 'dotenv/config';

const { PORT = 3000 } = process.env;

connectToDatabase();

app.listen(PORT, () => {
  console.log(`Servidor en línea en http://localhost:${PORT} 🚀`);
});
