import { generateToken } from '../helpers/jwt.helper.js';
import { Usuario } from '../models/usuario.model.js';

export const userRegister = async ({ body }, res) => {
  try {
    const { email, password } = body;

    const usuarioExistente = await Usuario.exists({ email });

    if (usuarioExistente)
      return res.status(400).json({
        response: 'El correo electrónico ya se encuentra registrado ⛔',
      });

    const usuario = new Usuario(body);
    usuario.password = await usuario.encryptPassword(password);

    await usuario.save();

    return res
      .status(201)
      .json({ response: 'Usuario registrado con éxito ✅', usuario });
  } catch (error) {
    return res.status(500).json({ response: 'Error en el servidor ⛔', error });
  }
};

export const userLogin = async ({ body }, res) => {
  try {
    const { email, password } = body;

    const usuario = await Usuario.findOne({ email });

    if (!usuario)
      return res.status(404).json({
        response: 'El correo electrónico no se encuentra registrado ⛔',
      });

    const matchPassword = await usuario.matchPassword(password);

    if (!matchPassword)
      return res
        .status(401)
        .json({ response: 'La contraseña es incorrecta ⛔' });

    const token = generateToken(usuario._id);
    return res
      .status(200)
      .json({ response: 'Inicio de sesión exitoso ✅', token });
  } catch (error) {
    return res.status(500).json({ response: 'Error en el servidor ⛔', error });
  }
};

export const userProfile = async ({ usuario }, res) => {
  res
    .status(200)
    .json({ response: 'Perfil de usuario obtenido con éxito ✅', usuario });
};
