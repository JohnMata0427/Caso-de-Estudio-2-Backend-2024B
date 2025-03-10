import { Router } from 'express';
import {
  createClient,
  getAllClients,
  getClientById,
  updateClientById,
  deleteClientById,
} from '../controllers/cliente.controller.js';
import { clienteValidator } from '../validators/cliente.validator.js';

const clienteRouter = Router();

clienteRouter.route('/clientes').get(getAllClients).post(clienteValidator, createClient);

clienteRouter
  .route('/cliente/:id')
  .get(getClientById)
  .put(clienteValidator, updateClientById)
  .delete(deleteClientById);

export { clienteRouter };
