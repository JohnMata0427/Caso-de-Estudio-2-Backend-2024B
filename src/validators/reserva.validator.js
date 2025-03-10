import { body, validationResult } from 'express-validator';

export const reservaValidator = [
  body(['codigo', 'descripcion', 'id_cliente', 'id_vehiculo'])
    .exists()
    .withMessage('Por favor, rellene todos los campos ⚠️')
    .notEmpty()
    .withMessage('Por favor, rellene todos los campos ⚠️')
    .trim(),

  body('codigo')
    .matches(/^RESER[0-9]{4}$/)
    .withMessage(
      'El código de reserva debe tener el formato RESER#### donde # es un dígito ⚠️',
    ),

  body('descripcion')
    .isLength({ min: 10, max: 100 })
    .withMessage(
      'La descripción de la reserva debe tener entre 10 y 100 caracteres ⚠️',
    )
    .matches(/^(.*[a-zA-Z]){8,}$/)
    .withMessage(
      'La descripción de la reserva debe tener al menos 8 caracteres de letras ⚠️',
    ),

  body('id_cliente')
    .isMongoId()
    .withMessage('El formato del id del cliente no es válido ⚠️'),

  body('id_vehiculo')
    .isMongoId()
    .withMessage('El formato del id del vehículo no es válido ⚠️'),

  (req, res, next) => {
    const errors = validationResult(req);
    const errorMessages = errors.array().map(error => error.msg);

    if (!errors.isEmpty())
      return res.status(400).json({ response: { errors: errorMessages } });

    next();
  },
];
