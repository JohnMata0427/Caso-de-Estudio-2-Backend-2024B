import { Schema, model } from 'mongoose';
import { hash, genSalt, compare } from 'bcryptjs';

const UsuarioSchema = new Schema(
  {
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
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

UsuarioSchema.methods.encryptPassword = async (password) => {
  return await hash(password, await genSalt(10));
};

UsuarioSchema.methods.matchPassword = async function (password) {
  return await compare(password, this.password);
};

export const Usuario = model('Usuario', UsuarioSchema);
