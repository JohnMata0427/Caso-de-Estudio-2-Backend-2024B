import { Cliente } from '../models/cliente.model.js';
import { Reserva } from '../models/reserva.model.js';

export const createClient = async ({ body }, res) => {
  try {
    const {
      cedula,
      nombre,
      apellido,
      ciudad,
      email,
      direccion,
      telefono,
      fecha_nacimiento,
    } = body;

    if (
      !cedula ||
      !nombre ||
      !apellido ||
      !ciudad ||
      !email ||
      !direccion ||
      !telefono ||
      !fecha_nacimiento
    ) {
      return res
        .status(400)
        .json({ response: 'Por favor, rellene todos los campos ⚠️' });
    }

    const cedulaExistente = await Cliente.exists({ cedula });

    if (cedulaExistente) {
      return res.status(400).json({
        response: 'La cédula ya se encuentra registrada ⚠️',
      });
    }

    const emailExistente = await Cliente.exists({ email });

    if (emailExistente) {
      return res.status(400).json({
        response: 'El correo electrónico ya se encuentra registrado ⚠️',
      });
    }

    const cliente = await Cliente.create(body);

    delete cliente.__v;

    return res
      .status(201)
      .json({ response: 'Cliente creado con éxito ✅', cliente });
  } catch (error) {
    return res.status(500).json({ response: 'Error en el servidor ⛔', error });
  }
};

export const getAllClients = async (_, res) => {
  try {
    const clientes = await Cliente.find().select('-__v');

    return res.status(200).json(clientes);
  } catch (error) {
    return res.status(500).json({ response: 'Error en el servidor ⛔', error });
  }
};

export const getClientById = async ({ params: { id } }, res) => {
  try {
    const cliente = await Cliente.findById(id).select('-__v');

    if (!cliente) {
      return res.status(404).json({ response: 'Cliente no encontrado ⚠️' });
    }

    const reservas = await Reserva.find({ id_cliente: id }).select('-__v');

    return res.status(200).json({ cliente, reservas });
  } catch (error) {
    return res.status(500).json({ response: 'Error en el servidor ⛔', error });
  }
};

export const updateClientById = async ({ params: { id }, body }, res) => {
  try {
    const clienteExistente = await Cliente.findById(id);

    if (!clienteExistente) {
      return res.status(404).json({ response: 'Cliente no encontrado ⚠️' });
    }

    const { cedula, email } = body;

    if (cedula && cedula !== clienteExistente.cedula) {
      const cedulaExistente = await Cliente.exists({ cedula });
      if (cedulaExistente) {
        return res.status(400).json({
          response: 'La cédula ya se encuentra registrada ⚠️',
        });
      }
    }

    if (email && email !== clienteExistente.email) {
      const emailExistente = await Cliente.exists({ email });
      if (emailExistente) {
        return res.status(400).json({
          response: 'El correo electrónico ya se encuentra registrado ⚠️',
        });
      }
    }

    const cliente = await Cliente.findByIdAndUpdate(id, body, { new: true }).select('-__v');

    return res
      .status(200)
      .json({ response: 'Cliente actualizado con éxito ✅', cliente });
  } catch (error) {
    return res.status(500).json({ response: 'Error en el servidor ⛔', error });
  }
};

export const deleteClientById = async ({ params: { id } }, res) => {
  try {
    const cliente = await Cliente.findById(id);

    if (!cliente) {
      return res.status(404).json({ response: 'Cliente no encontrado ⚠️' });
    }

    await cliente.remove();

    return res.status(200).json({ response: 'Cliente eliminado con éxito ✅' });
  } catch (error) {
    return res.status(500).json({ response: 'Error en el servidor ⛔', error });
  }
};
