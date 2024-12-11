# Hito2_DL

Proyecto de API RESTful avanzado para la gestión de pacientes y personal sanitario, desarrollado con Node.js, Express y TypeScript.

## Link Drive Screenshot

[Enlace a las capturas del Hito 2](https://drive.google.com/drive/folders/17CM7piX6zGqO20TMN0gh4ScfbmpeCb1K?usp=sharing)

## Tabla de Contenidos

- [Características](#características)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Uso](#uso)
- [Rutas de la API](#rutas-de-la-api)
  - [Autenticación](#autenticación)
  - [Pacientes](#pacientes)
  - [Personal Sanitario](#personal-sanitario)
- [Middlewares](#middlewares)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Contribuir](#contribuir)
- [Licencia](#licencia)

## Características

- Gestión avanzada de pacientes y personal sanitario.
- Implementación de autenticación y autorización con JWT.
- Validación de datos con Joi.
- Encriptación de contraseñas con Bcrypt.
- Utilización de variables de entorno con dotenv.
- Integración con PostgreSQL.
- Uso de TypeScript para tipado estático.

## Requisitos Previos

- Node.js instalado
- npm o yarn
- PostgreSQL instalado y configurado

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

3. Cambia a rama Hito_2:

   ```sh
   git checkout Hito_2
   ```
4. Instalacion postgres:

   ```sh
   docker-compose up -d
   ```
5. Ejecucion Cuery:

   ```sh
   Conectarse a db : credenciales archivo docker
   Query en archivo create.sql 
   ```

6. Instala las dependencias:

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

### Autenticación

- **POST** `/api/v1/auth/register`

  - **Descripción**: Registrar un nuevo usuario.
  - **Middleware**: Ninguno
  - **Controlador**: `authController.register`
  - **Cómo enviar**:

    ```json
    {
      "username": "juanperez",
      "password": "1234567",
      "role_id": "1"
    }
    ```

  - **Respuesta de ejemplo**:

    ```json
    {
       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imp1YW5wZXJleiIsImlkIjoyLCJpYXQiOjE3MzM4ODEyMzAsImV4cCI6MTczMzg4NDgzMH0.A7xN1N--ziS1azWlCKU61CfA6ep1Jf5KlUuQfqFTwAI"
    }
    ```

- **POST** `/api/v1/auth/login`

  - **Descripción**: Iniciar sesión y obtener un token JWT.
  - **Middleware**: Ninguno
  - **Controlador**: `authController.login`
  - **Cómo enviar**:

    ```json
    {
      "email": "juan@example.com",
      "password": "tu_contraseña"
    }
    ```

  - **Respuesta de ejemplo**:

    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imp1YW5wZXJleiIsImlkIjoyLCJpYXQiOjE3MzM4ODEzMDUsImV4cCI6MTczMzg4NDkwNX0.IDXbDud1NW7a1NF0FLpF4d0fq1ddW4bKa49fgyGkrX8"
    }
    ```

### Pacientes

- **GET** `/api/v1/patients/resume`

  - **Descripción**: Obtener un resumen de todos los pacientes.
  - **Middleware**: `verifyToken`
  - **Controlador**: `PatientController.getAllResume`
  - **Cómo enviar**: No aplica.
  - **Respuesta de ejemplo**:

    ```json
    {
      "patients": [
        {
          "id": 1,
          "name": "Juan Pérez",
          "age": 30,
          "rut": "12345678-9"
        },
        {
          "id": 2,
          "name": "María López",
          "age": 25,
          "rut": "98765432-1"
        }
      ]
    }
    ```

- **POST** `/api/v1/patients/register`

  - **Descripción**: Registrar un nuevo paciente.
  - **Middleware**: `verifyToken`
  - **Controlador**: `PatientController.createPatient`
  - **Cómo enviar**:

    ```json
    {
      "name": "Carlos Sánchez",
      "age": 40,
      "rut": "11222333-4"
    }
    ```

  - **Respuesta de ejemplo**:

    ```json
    {
     "patient": {
        "id": 2,
        "name": "Carlos Sánchez",
        "age": 40,
        "rut": "11222333-4"
      }
    }
    ```

- **POST** `/api/v1/patients/look`

  - **Descripción**: Buscar un paciente por su RUT.
  - **Middleware**: `verifyToken`
  - **Controlador**: `PatientController.getPatientByRut`
  - **Cómo enviar**:

    ```json
    {
      "rut": "12345678-9"
    }
    ```

  - **Respuesta de ejemplo**:

    ```json
    {
      "patient": {
        "id": 1,
        "name": "Juan Pérez",
        "age": 30,
        "rut": "12345678-9"
      }
    }
    ```

- **DELETE** `/api/v1/patients/:id`

  - **Descripción**: Eliminar un paciente por su ID.
  - **Middleware**: `verifyToken`
  - **Controlador**: `PatientController.deletePatientById`
  - **Cómo enviar**: No aplica. El ID se envía en la URL.
  - **Respuesta de ejemplo**:

    ```json
    {
      "message": "Paciente eliminado exitosamente."
    }
    ```

### Personal Sanitario

- **GET** `/api/v1/staff`

  - **Descripción**: Obtener todos los miembros del personal sanitario.
  - **Middleware**: `verifyToken`
  - **Controlador**: `staffController.getStaff`
  - **Cómo enviar**: No aplica.
  - **Respuesta de ejemplo**:

    ```json
    {
      "staff": [
        {
          "id": 1,
          "username": "doctor01",
          "role_id": 2
        },
        {
          "id": 2,
          "username": "nurse01",
          "role_id": 3
        }
      ]
    }
    ```

- **PUT** `/api/v1/staff/:id`

  - **Descripción**: Actualizar un miembro del personal sanitario.
  - **Middleware**: `verifyToken`, `staffValidation`
  - **Controlador**: `StaffController.update`
  - **Cómo enviar**:

    ```json
    {
      "username": "doctor01",
      "role_id": 2
    }
    ```

  - **Respuesta de ejemplo**:

    ```json
    {
      "message": "Personal sanitario actualizado exitosamente",
      "staff": {
        "id": 1,
        "name": "Dr. Carlos Pérez",
        "specialty": "Cardiología",
        "licenseNumber": "MED12345"
      }
    }
    ```

- **DELETE** `/api/v1/staff/:id`

  - **Descripción**: Eliminar un miembro del personal sanitario.
  - **Middleware**: `verifyToken`
  - **Controlador**: `StaffController.delete`
  - **Cómo enviar**: No aplica. El ID se envía en la URL.
  - **Respuesta de ejemplo**:

    ```json
    {
      "message": "Personal sanitario eliminado exitosamente"
    }
    ```

### Roles

- **GET** `/api/v1/roles`

  - **Descripción**: Obtener todos los roles disponibles.
  - **Middleware**: `verifyToken`
  - **Controlador**: `RoleController.getAllRoles`
  - **Cómo enviar**: No aplica.
  - **Respuesta de ejemplo**:

    ```json
    {
      "roles": [
        {
          "id": 1,
          "name": "Admin"
        },
        {
          "id": 2,
          "name": "Doctor"
        },
        {
          "id": 3,
          "name": "Enfermero"
        }
      ]
    }
    ```

- **GET** `/api/v1/roles/:id`

  - **Descripción**: Obtener un rol por su ID.
  - **Middleware**: `verifyToken`
  - **Controlador**: `RoleController.getRoleById`
  - **Cómo enviar**: No aplica. El ID se envía en la URL.
  - **Respuesta de ejemplo**:

    ```json
    {
      "role": {
        "id": 2,
        "name": "Doctor"
      }
    }
    ```

- **POST** `/api/v1/roles/create`

  - **Descripción**: Crear un nuevo rol.
  - **Middleware**: `verifyToken`
  - **Controlador**: `RoleController.createRole`
  - **Cómo enviar**:

    ```json
    {
      "name": "Recepcionista"
    }
    ```

  - **Respuesta de ejemplo**:

    ```json
    {
      "role": {
        "id": 4,
        "name": "Recepcionista"
      }
    }
    ```

- **DELETE** `/api/v1/roles/:id`

  - **Descripción**: Eliminar un rol por su ID.
  - **Middleware**: `verifyToken`
  - **Controlador**: `RoleController.deleteRoleById`
  - **Cómo enviar**: No aplica. El ID se envía en la URL.
  - **Respuesta de ejemplo**:

    ```json
    {
      "message": "Rol eliminado exitosamente."
    }
    ```

### Diagnósticos

- **GET** `/api/v1/diagnostics`

  - **Descripción**: Obtener todos los diagnósticos.
  - **Middleware**: `verifyToken`
  - **Controlador**: `DiagnosticController.getAllDiagnostics`
  - **Cómo enviar**: No aplica.
  - **Respuesta de ejemplo**:

    ```json
    {
      "diagnostics": [
        {
          "id": 1,
          "patient_id": 1,
          "description": "Gripe común",
          "created_at": "2023-10-05T12:00:00Z"
        },
        {
          "id": 2,
          "patient_id": 2,
          "description": "Migraña crónica",
          "created_at": "2023-10-06T15:30:00Z"
        }
      ]
    }
    ```

- **GET** `/api/v1/diagnostics/:id`

  - **Descripción**: Obtener un diagnóstico por su ID.
  - **Middleware**: `verifyToken`
  - **Controlador**: `DiagnosticController.getDiagnosticById`
  - **Cómo enviar**: No aplica. El ID se envía en la URL.
  - **Respuesta de ejemplo**:

    ```json
    {
      "diagnostic": {
        "id": 1,
        "patient_id": 1,
        "description": "Gripe común",
        "created_at": "2023-10-05T12:00:00Z"
      }
    }
    ```

- **POST** `/api/v1/diagnostics/create`

  - **Descripción**: Crear un nuevo diagnóstico para un paciente.
  - **Middleware**: `verifyToken`
  - **Controlador**: `DiagnosticController.createDiagnostic`
  - **Cómo enviar**:

    ```json
    {
      "patient_id": 1,
      "description": "Infección respiratoria aguda",
      "severity": 5,
      "staff_id": 1
    }
    ```

  - **Respuesta de ejemplo**:

    ```json
    {
      "diagnostic": {
        "id": 2,
        "description": "Infección respiratoria aguda",
        "severity": 5,
        "patient_id": 1,
        "staff_id": 1
      }
    }
    ```

- **DELETE** `/api/v1/diagnostics/:id`

  - **Descripción**: Eliminar un diagnóstico por su ID.
  - **Middleware**: `verifyToken`
  - **Controlador**: `DiagnosticController.deleteDiagnosticById`
  - **Cómo enviar**: No aplica. El ID se envía en la URL.
  - **Respuesta de ejemplo**:

    ```json
    {
      "message": "Diagnóstico eliminado exitosamente."
    }
    ```

## Estructura del Proyecto

- `src/controllers/`: Controladores de la API.
- `src/config/`: Configuración y variables de entorno.
- `src/interfaces/`: Interfaces TypeScript.
- `src/middlewares/`: Middlewares de autenticación, autorización y manejo de errores.
- `src/models/`: Modelos y esquemas de datos.
- `src/routes/`: Definición de rutas y endpoints.
- `src/schemas/`: Esquemas de validación de datos con Joi.
- `src/services/`: Lógica de negocio y servicios.
- `src/utils/`: Utilidades y funciones auxiliares.
