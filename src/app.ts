import express, { Application } from 'express';
import { httpErrorHandle } from './middlewares/httpErrorHandle.middleware';
import patientRoutes from './routes/patients.route';
import staffRoutes from './routes/staff.route';
import authRoutes from './routes/auth.route';
import roleRoutes from './routes/role.route';
import diagnosticRoutes from './routes/diagnostic.route';

const app: Application = express();

// Middleware global
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/patients', patientRoutes);
app.use('/api/v1/staff', staffRoutes);
app.use('/api/v1/roles', roleRoutes);
app.use('/api/v1/diagnostics', diagnosticRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    error: 'Ruta no encontrada.',
  });
});

app.use(httpErrorHandle);

export default app;
