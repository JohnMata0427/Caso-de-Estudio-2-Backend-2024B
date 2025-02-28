import { Schema, model } from 'mongoose';

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
    type: Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true,
  },
  id_vehiculo: {
    type: Schema.Types.ObjectId,
    ref: 'Vehiculo',
    required: true,
  },
});

export const Reserva = model('Reserva', ReservaSchema);
