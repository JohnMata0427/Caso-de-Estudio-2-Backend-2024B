import { Router } from 'express';
import {
  createReserva,
  getAllReservas,
  getReservaById,
  updateReservaById,
  deleteReservaById,
} from '../controllers/reserva.controller.js';

const reservaRouter = Router();

reservaRouter.route('/reservas').get(getAllReservas).post(createReserva);

reservaRouter
  .route('/reservas/:id')
  .get(getReservaById)
  .put(updateReservaById)
  .delete(deleteReservaById);

export { reservaRouter };
