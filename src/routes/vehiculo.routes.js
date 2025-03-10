import { Router } from 'express';
import {
  createVehiculo,
  getAllVehiculos,
  getVehiculoById,
  updateVehiculoById,
  deleteVehiculoById,
} from '../controllers/vehiculo.controller.js';
import { vehiculoValidator } from '../validators/vehiculo.validator.js';

const vehiculoRouter = Router();

vehiculoRouter.route('/vehiculos').get(getAllVehiculos).post(vehiculoValidator, createVehiculo);

vehiculoRouter
  .route('/vehiculo/:id')
  .get(getVehiculoById)
  .put(vehiculoValidator, updateVehiculoById)
  .delete(deleteVehiculoById);

export { vehiculoRouter };
