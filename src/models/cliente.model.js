import { Schema, model } from 'mongoose';
import { Reserva } from './reserva.model.js';

const ClienteSchema = new Schema(
  {
    cedula: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    apellido: {
      type: String,
      required: true,
      trim: true,
    },
    ciudad: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    direccion: {
      type: String,
      required: true,
      trim: true,
    },
    telefono: {
      type: String,
      required: true,
      trim: true,
    },
    fecha_nacimiento: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

ClienteSchema.pre('remove', async function (next) {
  try {
    await Reserva.deleteMany({ id_cliente: this._id });
    next();
  } catch (error) {
    next(error);
  }
});

export const Cliente = model('Cliente', ClienteSchema);
