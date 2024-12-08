-- Crear la extensión para UUID si es necesario
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Eliminar tablas si ya existen
DROP TABLE IF EXISTS diagnostics;
DROP TABLE IF EXISTS patients;
DROP TABLE IF EXISTS staff_roles;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS staff;

-- Crear tabla de Roles
CREATE TABLE roles (
    id SERIAL PRIMARY KEY, -- ID único para cada rol
    name VARCHAR(50) NOT NULL UNIQUE -- Nombre del rol (Médico, Enfermero, Administrativo, etc.)
);

-- Crear tabla de Staff
CREATE TABLE staff (
    id SERIAL PRIMARY KEY, -- ID único para cada miembro del staff
    username VARCHAR(100) NOT NULL UNIQUE, -- Nombre de usuario único
    password VARCHAR(200) NOT NULL, -- Contraseña
    role_id INT NOT NULL, -- Rol asociado
    FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE CASCADE -- Relación con roles, elimina staff si el rol es eliminado
);

-- Crear tabla de Pacientes
CREATE TABLE patients (
    id SERIAL PRIMARY KEY, -- ID único para cada paciente
    name VARCHAR(100) NOT NULL, -- Nombre del paciente
    age INT NOT NULL, -- Edad del paciente
    rut VARCHAR(50) NOT NULL UNIQUE -- RUT único del paciente
);

-- Crear tabla de Diagnósticos
CREATE TABLE diagnostics (
    id SERIAL PRIMARY KEY, -- ID único para cada diagnóstico
    description TEXT NOT NULL, -- Descripción del diagnóstico
    severity INT NOT NULL CHECK (severity BETWEEN 1 AND 6), -- Gravedad de 1 a 6
    patient_id INT NOT NULL, -- ID del paciente diagnosticado
    staff_id INT NOT NULL, -- ID del staff que hizo el diagnóstico
    FOREIGN KEY (patient_id) REFERENCES patients (id) ON DELETE CASCADE, -- Relación con pacientes
    FOREIGN KEY (staff_id) REFERENCES staff (id) ON DELETE CASCADE -- Relación con staff
);

-- Consultas iniciales para probar
-- Insertar roles
INSERT INTO roles (name) VALUES ('Médico'), ('Enfermero'), ('Administrativo');

-- Insertar staff
INSERT INTO staff (username, password, role_id) VALUES ('jdoe', 'securepassword', 1);

-- Insertar pacientes
INSERT INTO patients (name, age, rut) VALUES ('Juan Perez', 30, '12345678-9');

-- Insertar diagnósticos
INSERT INTO diagnostics (description, severity, patient_id, staff_id) 
VALUES ('Dolor de cabeza', 4, 1, 1);

-- Consultar todas las tablas
SELECT * FROM roles;
SELECT * FROM staff;
SELECT * FROM patients;
SELECT * FROM diagnostics;
