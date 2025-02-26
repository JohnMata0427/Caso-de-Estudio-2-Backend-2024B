import { Router } from 'express';
import {
  createVehiculo,
  getAllVehiculos,
  getVehiculoById,
  updateVehiculoById,
  deleteVehiculoById,
} from '../controllers/vehiculo.controller.js';

const vehiculoRouter = Router();

vehiculoRouter.route('/vehiculos').get(getAllVehiculos).post(createVehiculo);

vehiculoRouter
  .route('/vehiculos/:id')
  .get(getVehiculoById)
  .put(updateVehiculoById)
  .delete(deleteVehiculoById);

export { vehiculoRouter };
