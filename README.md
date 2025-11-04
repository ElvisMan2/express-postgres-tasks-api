# 🧩 Tasks API - Express + PostgreSQL

API RESTful desarrollada con **Express.js**, **Node.js 22** y **PostgreSQL** para la gestión de tareas (CRUD completo).

---

## 🚀 Características

- CRUD completo de tareas (`GET`, `POST`, `PATCH`, `DELETE`)
- Validación básica: `title` es obligatorio
- `done` tiene valor por defecto `false`
- Conexión a PostgreSQL usando `pg`
- Estructura modular: rutas, controladores y configuración separadas
- Compatible con Node.js 20+

---

## 🧱 Modelo de datos

| Campo        | Tipo        | Restricciones / Descripción |
|---------------|-------------|------------------------------|
| `id`          | SERIAL PK   | Identificador único |
| `title`       | VARCHAR(255) | **Obligatorio** |
| `description` | TEXT        | Opcional |
| `done`        | BOOLEAN     | Por defecto `false` |
| `created_at`  | TIMESTAMP   | Por defecto `CURRENT_TIMESTAMP` |
| `updated_at`  | TIMESTAMP   | Se actualiza en cada modificación |

---

## ⚙️ Requisitos previos

Asegúrate de tener instalado:

- [Node.js 22+](https://nodejs.org)
- [PostgreSQL 14+](https://www.postgresql.org/)
- [npm](https://www.npmjs.com/)

---

## 📂 Estructura del proyecto

