import { Router } from 'express';
import {
  createClient,
  getAllClients,
  getClientById,
  updateClientById,
  deleteClientById,
} from '../controllers/cliente.controller.js';

const clienteRouter = Router();

clienteRouter.route('/clientes').get(getAllClients).post(createClient);

clienteRouter
  .route('/clientes/:id')
  .get(getClientById)
  .put(updateClientById)
  .delete(deleteClientById);

export { clienteRouter };
