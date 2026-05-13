# AdminBot

AdminBot es una plataforma de gestión académica desarrollada para optimizar la administración escolar mediante un sistema moderno, rápido y escalable. El proyecto utiliza Node.js + Express en el backend y Vite con JavaScript Vanilla en el frontend.

## Estructura del proyecto

* `Backend/` → servidor principal, API REST, autenticación JWT, conexión con MySQL e integración de WhatsApp.
* `Frontend/` → interfaz administrativa del sistema: dashboard, estudiantes, acudientes, pagos y autenticación.

---

## Requisitos

Para ejecutar el proyecto necesitas:

* Node.js v18 o superior
* MySQL instalado y configurado
* npm

---

## Configuración del backend

1. Configura el archivo `.env` con tus credenciales y tokens.

Debes completar:

* conexión MySQL
* JWT_SECRET
* configuración de WhatsApp

2. Importa la base de datos usando:

```sql id="8g4n2n"
Backend/database.sql
```

3. Si deseas cargar información de prueba puedes usar:

```bash id="r8y2rj"
Backend/src/seed/seed.js
```

---

## Ejecutar el backend

```bash id="6ps2l7"
cd Backend
npm install
npm run start
```

El servidor iniciará en:

```bash id="lm52fo"
http://localhost:3000
```

---

## Configuración del frontend

```bash id="mu47kg"
cd Frontend
npm install
npm run dev
```

Abre la URL proporcionada por Vite para acceder al sistema.

---

## Acceso al sistema

Credenciales de prueba disponibles:

```txt id="q6q6n6"
admin@adminbot.com / 123456
```

```txt id="ljaz9j"
soporte@adminbot.com / admin123
```

---

## Variables de entorno

Ejemplo:

```env id="qnb6d9"
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_PORT=
JWT_SECRET=
PHONE_ID=
WHATSAPP_TOKEN=
```

---

## Características

* Gestión de estudiantes
* Administración de acudientes
* Control de pagos
* Sistema de autenticación
* Integración con WhatsApp
* Panel administrativo interactivo
* Arquitectura modular y escalable

---

## Notas

* Los archivos `.env` se encuentran protegidos mediante `.gitignore`.
* La integración de WhatsApp requiere credenciales válidas de Meta.
* El módulo de asistencia está preparado para futuras implementaciones CRUD.
* Proyecto diseñado para facilitar procesos administrativos en instituciones educativas.
