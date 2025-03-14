import { body, validationResult } from 'express-validator';

export const clienteValidator = [
  body([
    'cedula',
    'nombre',
    'apellido',
    'ciudad',
    'email',
    'direccion',
    'telefono',
    'fecha_nacimiento',
  ])
    .exists()
    .withMessage('Por favor, rellene todos los campos ⚠️')
    .notEmpty()
    .withMessage('Por favor, rellene todos los campos ⚠️')
    .trim(),

  body('cedula')
    .isLength({ min: 10, max: 10 })
    .withMessage('La cédula del cliente debe tener 10 caracteres ⚠️')
    .isNumeric()
    .withMessage('La cédula del cliente solo puede contener números ⚠️'),

  body(['nombre', 'apellido'])
    .isLength({ min: 3, max: 20 })
    .withMessage(
      'El nombre y/o apellido del cliente debe tener entre 3 y 20 caracteres ⚠️'
    )
    .isAlpha('es-ES', { ignore: 'áéíóúñÁÉÍÓÚÑ' })
    .withMessage(
      'El nombre y/o apellido del cliente solo puede contener letras ⚠️'
    ),

  body('ciudad')
    .isLength({ min: 3, max: 50 })
    .withMessage('La ciudad del cliente debe tener entre 3 y 50 caracteres ⚠️')
    .isAlpha('es-ES', { ignore: 'áéíóúñÁÉÍÓÚÑ' })
    .withMessage('La ciudad del cliente solo puede contener letras ⚠️'),

  body('email')
    .isEmail()
    .withMessage('El formato del email del cliente no es válido ⚠️')
    .toLowerCase(),

  body('direccion')
    .matches(/^[a-zA-Z0-9\s,.'-]{3,100}$/)
    .withMessage(
      'La dirección del cliente debe tener entre 3 y 100 caracteres ⚠️'
    ),

  body('telefono')
    .isMobilePhone('es-EC', { strictMode: true })
    .withMessage(
      'El número de teléfono del cliente no es válido de Ecuador 🇪🇨 ⚠️'
    ),

  body('fecha_nacimiento')
    .isDate({ format: 'YYYY-MM-DD' })
    .withMessage('La fecha de nacimiento del cliente no es válida ⚠️')
    .custom(value => {
      const anioNacimiento = new Date(value).getFullYear();
      const anioActual = new Date().getFullYear();
      const edad = anioActual - anioNacimiento;
      
      if (edad < 18 || edad > 90)
        throw new Error(
          'La fecha de nacimiento del cliente debe ser mayor a 18 años y menor a 90 años ⚠️'
        );
      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    const errorMessages = errors.array().map(error => error.msg);

    if (!errors.isEmpty())
      return res.status(400).json({ response: { errors: errorMessages } });

    next();
  },
];
