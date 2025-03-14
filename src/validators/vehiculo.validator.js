import { body, validationResult } from 'express-validator';

export const vehiculoValidator = [
  body([
    'marca',
    'modelo',
    'anio_fabricacion',
    'placa',
    'color',
    'tipo_vehiculo',
    'kilometraje',
    'descripcion',
  ])
    .exists()
    .withMessage('Por favor, rellene todos los campos ⚠️')
    .notEmpty()
    .withMessage('Por favor, rellene todos los campos ⚠️')
    .trim(),

  body('marca')
    .isLength({ min: 3, max: 20 })
    .withMessage('La marca del vehículo debe tener entre 3 y 20 caracteres ⚠️')
    .isAlpha('es-ES', { ignore: 'áéíóúñÁÉÍÓÚÑ' })
    .withMessage('La marca del vehículo solo puede contener letras ⚠️')
    .customSanitizer(value => value?.toUpperCase()),

  body('modelo')
    .isLength({ min: 1, max: 30 })
    .withMessage('El modelo del vehículo debe tener entre 1 y 30 caracteres ⚠️')
    .isAlphanumeric('es-ES', { ignore: ' ' })
    .withMessage(
      'El modelo del vehículo solo puede contener letras y números ⚠️'
    ),

  body('anio_fabricacion')
    .isNumeric()
    .withMessage('El año de fabricación debe ser un número ⚠️')
    .custom(value => {
      const currentYear = new Date().getFullYear();
      if (value < 1950 || value > currentYear) {
        throw new Error(
          'El año de fabricación debe estar entre 1950 y el año actual ⚠️'
        );
      }
      return true;
    }),

  body('placa')
    .matches(/^[A-Z]{3}-\d{4}$/)
    .withMessage(
      'El formato de la placa del vehículo no es válido (formato: ABC-1234) ⚠️'
    ),

  body('color')
    .isHexColor()
    .withMessage(
      'El color del vehículo debe ser un color hexadecimal válido ⚠️ (ej: #FF0000)'
    ),

  body('tipo_vehiculo')
    .isLength({ min: 3, max: 20 })
    .withMessage('El tipo de vehículo debe tener entre 3 y 20 caracteres ⚠️')
    .isAlpha('es-ES', { ignore: 'áéíóúñÁÉÍÓÚÑ' })
    .withMessage('El tipo de vehículo solo puede contener letras ⚠️'),

  body('kilometraje')
    .matches(/^\d{2,3}km - \d{2,3}km$/)
    .withMessage(
      'El formato del kilometraje del vehículo no es válido (ej: 70km - 200km) ⚠️'
    )
    .custom(value => {
      const [kmInicial, kmFinal] = value.split(' - ').map(km => parseInt(km));

      if (kmInicial < 20 || kmInicial > 360)
        throw new Error(
          'El kilometraje inicial del vehículo debe estar entre 20km y 360km ⚠️'
        );

      if (kmFinal < 20 || kmFinal > 360)
        throw new Error(
          'El kilometraje final del vehículo debe estar entre 20km y 360km ⚠️'
        );

      if (kmFinal < kmInicial)
        throw new Error(
          'El kilometraje final del vehículo debe ser mayor al inicial ⚠️'
        );

      if (kmFinal - kmInicial < 50)
        throw new Error(
          'La diferencia entre el kilometraje final e inicial debe ser de al menos 40km ⚠️'
        );

      return true;
    }),

  body('descripcion')
    .isLength({ max: 200 })
    .withMessage(
      'La descripción del vehículo debe tener como máximo 200 caracteres ⚠️'
    )
    .matches(/[a-zA-Z]{8,}/)
    .withMessage('La descripción del vehículo debe tener al menos 8 letras ⚠️'),

  (req, res, next) => {
    const errors = validationResult(req);
    const errorMessages = errors.array().map(error => error.msg);

    if (!errors.isEmpty())
      return res.status(400).json({ response: { errors: errorMessages } });

    next();
  },
];
