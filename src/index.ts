import { pool } from './config/database';
import app from './app';

const PORT = 3000;

const main = async () => {
  try {
    const { rows } = await pool.query('SELECT NOW()');
    console.log(rows[0].now, 'db conectada!');
    app.listen(PORT, () => {
      console.log('Servidor andando en el puerto: ' + PORT);
    });
  } catch (error) {
    console.log(error);
  }
};

main();
