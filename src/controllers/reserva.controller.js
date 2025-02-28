import { Cliente } from '../models/cliente.model.js';
import { Reserva } from '../models/reserva.model.js';
import { Vehiculo } from '../models/vehiculo.model.js';

export const createReserva = async ({ body }, res) => {
  try {
    const { codigo, descripcion, id_cliente, id_vehiculo } = body;

    if (!codigo || !descripcion || !id_cliente || !id_vehiculo) {
      return res
        .status(400)
        .json({ response: 'Por favor, rellene todos los campos ⚠️' });
    }

    const codigoExistente = await Reserva.exists({ codigo });

    if (codigoExistente) {
      return res.status(400).json({
        response: 'El código de reserva ya se encuentra registrado ⚠️',
      });
    }

    const clienteExistente = await Cliente.exists({ _id: id_cliente });

    if (!clienteExistente) {
      return res.status(404).json({
        response: 'El cliente no se encuentra registrado ⚠️',
      });
    }

    const vehiculoExistente = await Vehiculo.exists({ _id: id_vehiculo });

    if (!vehiculoExistente) {
      return res.status(404).json({
        response: 'El vehículo no se encuentra registrado ⚠️',
      });
    }

    const reserva = await Reserva.create(body);

    delete reserva.__v;

    return res
      .status(201)
      .json({ response: 'Reserva creada con éxito ✅', reserva });
  } catch (error) {
    return res.status(500).json({ response: 'Error en el servidor ⛔', error });
  }
};

export const getAllReservas = async (_, res) => {
  try {
    const reservas = await Reserva.find().select('-__v');

    return res.status(200).json(reservas);
  } catch (error) {
    return res.status(500).json({ response: 'Error en el servidor ⛔', error });
  }
};

export const getReservaById = async ({ params: { id } }, res) => {
  try {
    const reserva = await Reserva.findById(id).select('-__v');

    if (!reserva) {
      return res.status(404).json({ response: 'Reserva no encontrada ⚠️' });
    }

    const { id_cliente, id_vehiculo } = reserva;

    const cliente = await Cliente.findById(id_cliente).select('-__v');
    const vehiculo = await Vehiculo.findById(id_vehiculo).select('-__v');

    return res.status(200).json({ reserva, cliente, vehiculo });
  } catch (error) {
    return res.status(500).json({ response: 'Error en el servidor ⛔', error });
  }
};

export const updateReservaById = async ({ params: { id }, body }, res) => {
  try {
    const reservaExistente = await Reserva.findById(id);

    if (!reservaExistente) {
      return res.status(404).json({ response: 'Reserva no encontrada ⚠️' });
    }

    const { codigo, id_cliente, id_vehiculo } = body;

    if (codigo && codigo !== reservaExistente.codigo) {
      const codigoExistente = await Reserva.exists({ codigo });

      if (codigoExistente) {
        return res.status(400).json({
          response: 'El código de reserva ya se encuentra registrado ⚠️',
        });
      }
    }

    if (id_cliente && id_cliente !== reservaExistente.id_cliente) {
      const clienteExistente = await Cliente.exists({ _id: id_cliente });

      if (!clienteExistente) {
        return res.status(404).json({
          response: 'El cliente no se encuentra registrado ⚠️',
        });
      }
    }

    if (id_vehiculo && id_vehiculo !== reservaExistente.id_vehiculo) {
      const vehiculoExistente = await Vehiculo.exists({ _id: id_vehiculo });

      if (!vehiculoExistente) {
        return res.status(404).json({
          response: 'El vehículo no se encuentra registrado ⚠️',
        });
      }
    }

    const reserva = await Reserva.findByIdAndUpdate(id, body, { new: true }).select('-__v');

    return res
      .status(200)
      .json({ response: 'Reserva actualizada con éxito ✅', reserva });
  } catch (error) {
    return res.status(500).json({ response: 'Error en el servidor ⛔', error });
  }
};

export const deleteReservaById = async ({ params: { id } }, res) => {
  try {
    const reserva = await Reserva.findById(id);

    if (!reserva) {
      return res.status(404).json({ response: 'Reserva no encontrada ⚠️' });
    }

    await Reserva.findByIdAndDelete(id);

    return res.status(200).json({ response: 'Reserva eliminada con éxito ✅' });
  } catch (error) {
    return res.status(500).json({ response: 'Error en el servidor ⛔', error });
  }
};
