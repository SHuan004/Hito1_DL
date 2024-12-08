import express, { Application } from 'express';
import { pool } from './config/database';
import { httpErrorHandle } from './middlewares/httpErrorHandle.middleware';
import patientRoutes from './routes/patients.route';
import staffRoutes from './routes/staff.route';
import authRoutes from './routes/auth.route';

const app: Application = express();
const PORT = 3000;

// Middleware global
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/patients', patientRoutes);
app.use('/api/v1/staff', staffRoutes);

app.use(httpErrorHandle);

(async () => {
  try {
    await pool.connect();
    const { rows } = await pool.query('SELECT NOW()');
    console.log('Postgres connectado ha : ', rows[0].now);
    app.listen(PORT, () => {
      console.log(`Server corriento en puerto  ${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor: ', error);
  }
})();
