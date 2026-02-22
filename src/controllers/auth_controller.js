import Usuario from '../models/Usuario.js';
import { crearTokenJWT } from '../middlewares/JWT.js';

const registro = async (req, res) => {
  try {
    const { email, password, nombre, apellido } = req.body;

    if (!email || !password || !nombre || !apellido)
      return res.status(400).json({ msg: 'Faltan campos obligatorios' });

    const existe = await Usuario.findOne({ email });
    if (existe) return res.status(400).json({ msg: 'Email ya registrado' });

    const nuevoUsuario = new Usuario({ email, password, nombre, apellido });
    nuevoUsuario.password = await nuevoUsuario.encryptPassword(password);

    await nuevoUsuario.save();

    res.status(201).json({ msg: 'Usuario registrado', usuario: nuevoUsuario });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const login = async (req,res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ msg:'Completa todos los campos' });

    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(404).json({ msg:'Usuario no encontrado' });

    const passwordValido = await usuario.matchPassword(password);
    if (!passwordValido) return res.status(401).json({ msg:'Password incorrecto' });

    const token = crearTokenJWT(usuario._id);

    res.status(200).json({ token, usuario });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const perfil = (req,res) => {
  res.status(200).json({ msg:'Perfil del usuario', usuario: req.usuarioBDD });
};

export { registro, login, perfil };