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
      'El modelo del vehículo solo puede contener letras y números ⚠️',
    ),

  body('anio_fabricacion')
    .isNumeric()
    .withMessage('El año de fabricación debe ser un número ⚠️')
    .isLength({ min: 4, max: 4 })
    .withMessage('El año de fabricación debe tener 4 dígitos ⚠️')
    .custom(value => {
      const currentYear = new Date().getFullYear();
      if (value < 1950 || value > currentYear) {
        throw new Error(
          'El año de fabricación debe estar entre 1950 y el año actual ⚠️',
        );
      }
      return true;
    }),

  body('placa')
    .isLength({ min: 8, max: 8 })
    .withMessage('La placa del vehículo debe tener 8 caracteres ⚠️')
    .matches(/^[A-Z]{3}-\d{4}$/)
    .withMessage(
      'El formato de la placa del vehículo no es válido (formato: ABC-1234) ⚠️',
    ),

  body('color')
    .isLength({ min: 7, max: 7 })
    .withMessage('El color del vehículo debe tener 7 caracteres ⚠️')
    .isHexColor()
    .withMessage(
      'El color del vehículo debe ser un color hexadecimal válido ⚠️',
    ),

  body('tipo_vehiculo')
    .isLength({ min: 3, max: 20 })
    .withMessage('El tipo de vehículo debe tener entre 3 y 20 caracteres ⚠️')
    .isAlpha('es-ES', { ignore: 'áéíóúñÁÉÍÓÚÑ' })
    .withMessage('El tipo de vehículo solo puede contener letras ⚠️'),

  body('kilometraje')
    .matches(/^\d{2,3}km - \d{2,3}km$/)
    .withMessage(
      'El formato del kilometraje del vehículo no es válido (ej: 70km - 200km) ⚠️',
    )
    .custom(value => {
      const [kilometrajeInicial, kilometrajeFinal] = value.split('km - ');
      if (kilometrajeInicial < 0 || kilometrajeFinal < 0) {
        throw new Error(
          'El kilometraje inicial y final del vehículo deben ser mayores a 0 ⚠️',
        );
      }

      if (kilometrajeInicial > 350 || kilometrajeFinal > 400) {
        throw new Error(
          'El kilometraje inicial y final del vehículo no pueden ser mayores a 350km y 400km respectivamente ⚠️',
        );
      }

      if (kilometrajeInicial >= kilometrajeFinal) {
        throw new Error(
          'El kilometraje inicial debe ser menor al kilometraje final ⚠️',
        );
      }
      return true;
    }),

  body('descripcion')
    .isLength({ min: 10, max: 200 })
    .withMessage(
      'La descripción del vehículo debe tener entre 10 y 200 caracteres ⚠️',
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
