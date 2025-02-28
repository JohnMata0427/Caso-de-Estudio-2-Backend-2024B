import { Schema, model } from 'mongoose';
import { Reserva } from './reserva.model.js';

const VehiculoSchema = new Schema({
  marca: {
    type: String,
    required: true,
    trim: true,
  },
  modelo: {
    type: String,
    required: true,
    trim: true,
  },
  anio_fabricacion: {
    type: Number,
    required: true,
  },
  placa: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  color: {
    type: String,
    required: true,
    trim: true,
  },
  tipo_vehiculo: {
    type: String,
    required: true,
    trim: true,
  },
  kilometraje: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
    trim: true,
  },
});

VehiculoSchema.pre('remove', async function (next) {
  try {
    await Reserva.deleteMany({ id_vehiculo: this._id });
    next();
  } catch (error) {
    next(error);
  }
});

export const Vehiculo = model('Vehiculo', VehiculoSchema);
