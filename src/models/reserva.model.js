import { Schema, model, Types } from 'mongoose';

const ReservaSchema = new Schema({
  codigo: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  descripcion: {
    type: String,
    required: true,
    trim: true,
  },
  id_cliente: {
    type: Types.ObjectId,
    ref: 'Cliente',
    required: true,
  },
  id_vehiculo: {
    type: Types.ObjectId,
    ref: 'Vehiculo',
    required: true,
  },
});

export const Reserva = model('Reserva', ReservaSchema);
