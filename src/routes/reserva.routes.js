import { Router } from 'express';
import {
  createReserva,
  getAllReservas,
  getReservaById,
  updateReservaById,
  deleteReservaById,
} from '../controllers/reserva.controller.js';
import { reservaValidator } from '../validators/reserva.validator.js';

const reservaRouter = Router();

reservaRouter.route('/reservas').get(getAllReservas).post(reservaValidator, createReserva);

reservaRouter
  .route('/reserva/:id')
  .get(getReservaById)
  .put(reservaValidator, updateReservaById)
  .delete(deleteReservaById);

export { reservaRouter };
