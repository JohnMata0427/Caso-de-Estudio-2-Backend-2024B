import { Reserva } from '../models/reserva.model.js';
import { Vehiculo } from '../models/vehiculo.model.js';

export const createVehiculo = async ({ body }, res) => {
  try {
    const {
      marca,
      modelo,
      anio_fabricacion,
      placa,
      color,
      tipo_vehiculo,
      kilometraje,
      descripcion,
    } = body;

    if (
      !marca ||
      !modelo ||
      !anio_fabricacion ||
      !placa ||
      !color ||
      !tipo_vehiculo ||
      !kilometraje ||
      !descripcion
    ) {
      return res
        .status(400)
        .json({ response: 'Por favor, rellene todos los campos ⚠️' });
    }

    const placaExistente = await Vehiculo.exists({ placa });

    if (placaExistente) {
      return res.status(400).json({
        response: 'La placa ya se encuentra registrada ⚠️',
      });
    }

    const anioActual = new Date().getFullYear();

    if (anio_fabricacion > anioActual) {
      return res.status(400).json({
        response: 'El año de fabricación no puede ser mayor al año actual ⚠️',
      });
    }

    const vehiculo = await Vehiculo.create(body);

    return res
      .status(201)
      .json({ response: 'Vehículo creado con éxito ✅', vehiculo });
  } catch (error) {
    return res.status(500).json({ response: 'Error en el servidor ⛔', error });
  }
};

export const getAllVehiculos = async (_, res) => {
  try {
    const vehiculos = await Vehiculo.find();

    return res.status(200).json(vehiculos);
  } catch (error) {
    return res.status(500).json({ response: 'Error en el servidor ⛔', error });
  }
};

export const getVehiculoById = async ({ params: { id } }, res) => {
  try {
    const vehiculo = await Vehiculo.findById(id);

    if (!vehiculo) {
      return res.status(404).json({ response: 'Vehículo no encontrado ⚠️' });
    }

    const reservas = await Reserva.find({ id_vehiculo: id });

    return res.status(200).json({ vehiculo, reservas });
  } catch (error) {
    return res.status(500).json({ response: 'Error en el servidor ⛔', error });
  }
};

export const updateVehiculoById = async ({ params: { id }, body }, res) => {
  try {
    const vehiculoExistente = await Vehiculo.findById(id);

    if (!vehiculoExistente) {
      return res.status(404).json({ response: 'Vehículo no encontrado ⚠️' });
    }

    const { placa } = body;

    if (placa && placa !== vehiculoExistente.placa) {
      const placaExistente = await Vehiculo.exists({ placa });

      if (placaExistente) {
        return res.status(400).json({
          response: 'La placa ya se encuentra registrada ⚠️',
        });
      }
    }

    const anioActual = new Date().getFullYear();

    if (
      anio_fabricacion &&
      anio_fabricacion !== vehiculoExistente.anio_fabricacion &&
      anio_fabricacion > anioActual
    ) {
      return res.status(400).json({
        response: 'El año de fabricación no puede ser mayor al año actual ⚠️',
      });
    }

    const vehiculo = await Vehiculo.findByIdAndUpdate(id, body, { new: true });

    return res
      .status(200)
      .json({ response: 'Vehículo actualizado con éxito ✅', vehiculo });
  } catch (error) {
    return res.status(500).json({ response: 'Error en el servidor ⛔', error });
  }
};

export const deleteVehiculoById = async ({ params: { id } }, res) => {
  try {
    const vehiculo = await Vehiculo.findById(id);

    if (!vehiculo) {
      return res.status(404).json({ response: 'Vehículo no encontrado ⚠️' });
    }

    await vehiculo.remove();

    return res
      .status(200)
      .json({ response: 'Vehículo eliminado con éxito ✅' });
  } catch (error) {
    return res.status(500).json({ response: 'Error en el servidor ⛔', error });
  }
};
