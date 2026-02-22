// generarPassword.js
import bcrypt from 'bcryptjs';

// Contraseña que quieres cifrar
const passwordPlain = '123456';

// Función para cifrar
const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10); // número de rondas de sal
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
};

// Ejecutar
encryptPassword(passwordPlain)
  .then((hash) => {
    console.log('Contraseña original:', passwordPlain);
    console.log('Contraseña cifrada:', hash);
  })
  .catch((err) => console.error('Error al cifrar:', err));