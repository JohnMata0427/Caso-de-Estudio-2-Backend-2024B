import { body, validationResult } from 'express-validator';

export const usuarioValidator = [
  body(['nombre', 'apellido', 'email', 'password'])
    .exists()
    .withMessage('Por favor, rellene todos los campos ⚠️')
    .notEmpty()
    .withMessage('Por favor, rellene todos los campos ⚠️')
    .trim(),

  body(['nombre', 'apellido'])
    .isLength({ min: 3, max: 20 })
    .withMessage(
      'El nombre y/o apellido del usuario debe tener entre 3 y 20 caracteres ⚠️',
    )
    .isAlpha('es-ES', { ignore: 'áéíóúñÁÉÍÓÚÑ' })
    .withMessage(
      'El nombre y/o apellido del usuario solo puede contener letras ⚠️',
    ),

  body('email')
    .isEmail()
    .withMessage('El formato del email del usuario no es válido ⚠️')
    .toLowerCase(),

  body('password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/,
    )
    .withMessage(
      'La contraseña del usuario debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial ⚠️',
    ),

  (req, res, next) => {
    const errors = validationResult(req);
    const errorMessages = errors.array().map(error => error.msg);

    if (!errors.isEmpty())
      return res.status(400).json({ response: { errors: errorMessages } });

    next();
  },
];
