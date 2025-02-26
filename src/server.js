import express, { json } from 'express';
import cors from 'cors';
import { authRouter } from './routes/auth.routes.js';
import { clienteRouter } from './routes/cliente.routes.js';
import { vehiculoRouter } from './routes/vehiculo.routes.js';
import { reservaRouter } from './routes/reserva.routes.js';
import { authMiddleware } from './middlewares/auth.middleware.js';

const app = express();

app.use(cors());
app.use(json());

app.get('/', (_, res) =>
  res.json({ response: 'El servidor está funcionando correctamente 🚀' }),
);

app.use('/api/v1', authRouter);
app.use('/api/v1', authMiddleware, [
  clienteRouter,
  vehiculoRouter,
  reservaRouter,
]);

app.use((_, res) =>
  res.status(404).json({ response: 'La ruta solicitada no existe ⚠️' }),
);

export { app };
