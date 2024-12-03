import express, { Application } from 'express';
import patientRoutes from './routes/patients.route';
import staffRoutes from './routes/staff.route';

const app: Application = express();
const PORT = 3000;

// Middleware global
app.use(express.json());

// Rutas
app.use('/api/v1/patients', patientRoutes);
app.use('/api/v1/staff', staffRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
