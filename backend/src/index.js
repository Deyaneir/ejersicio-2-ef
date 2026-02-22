import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './server.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Conexión a MongoDB exitosa');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error al conectar a MongoDB:', error.message);
    process.exit(1);
  });

export default app;
