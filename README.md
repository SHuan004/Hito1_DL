# Hito1_DL

Proyecto de API RESTful para la gestión de pacientes y personal sanitario, desarrollado con Node.js y Express.

## Link Drive Screenshot

https://drive.google.com/drive/folders/17CM7piX6zGqO20TMN0gh4ScfbmpeCb1K?usp=sharing

## Tabla de Contenidos

- [Características](#características)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Uso](#uso)
- [Rutas de la API](#rutas-de-la-api)
  - [Pacientes](#pacientes)
  - [Personal](#personal)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Contribuir](#contribuir)
- [Licencia](#licencia)

## Características

- Gestión eficiente de pacientes y personal sanitario.
- Autenticación y autorización mediante JWT.
- Arquitectura escalable y modular.
- Uso de TypeScript para una mejor calidad de código.

## Requisitos Previos

- Node.js versión 14 o superior.
- npm versión 6 o superior.

## Instalación

1. Clona el repositorio:

   ```sh
   git clone https://github.com/SHuan004/Hito1_DL.git
   ```

2. Navega al directorio del proyecto:

   ```sh
   cd Hito1_DL
   ```

3. Instala las dependencias:

   ```sh
   npm install
   ```

## Uso

1. Configura las variables de entorno si es necesario.

2. Inicia el servidor con:

   ```sh
   npm run dev
   ```

El servidor estará disponible en `http://localhost:3000`.

## Rutas de la API

### Pacientes

- **GET** `/api/v1/patients/resume`

  - **Descripción**: Obtiene un resumen de todos los pacientes.
  - **Middleware**: `authMiddleware`
  - **Controlador**: `PatientController.getAllResume`
  - **Respuesta de ejemplo**:

    ```json
    {
        "id": 1,
        "name": "Juan Pérez",
        "age": 45,
        "rut": "12345678-9",
        "symptoms": "Fiebre y dolor abdominal"
    },
    ```

### Personal

- **POST** `/api/v1/staff/login`

  - **Descripción**: Inicia sesión y obtiene un token JWT.
  - **Controlador**: `AuthController.login`
  - **Parámetros**:

    ```json
    {
      "email": "user@example.com",
      "password": "tu_contraseña"
    }
    ```

- **POST** `/api/v1/staff/register`

  - **Descripción**: Registra un nuevo miembro del personal.
  - **Controlador**: `AuthController.register`
  - **Parámetros**:

    ```json
    {
      "name": "Nombre Apellido",
      "email": "user@example.com",
      "password": "tu_contraseña",
      "role": "doctor"
    }
    ```

## Estructura del Proyecto

- `src/controllers/`: Controladores de la API.
- `src/data/`: Datos de ejemplo en formato JSON.
- `src/interfaces/`: Interfaces TypeScript.
- `src/middleware/`: Middlewares de autenticación y autorización.
- `src/models/`: Modelos y esquemas de datos.
- `src/routes/`: Definición de rutas y endpoints.
- `src/services/`: Lógica de negocio y servicios.
