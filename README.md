# Web project
Proyecto LLM 1º DAW clon de una pagina web
web a copiar: [sephora](https://www.sephora.com/)

# Clon Web de Sephora
## Descripción del proyecto
Este proyecto consiste en recrear una versión propia de la página web de Sephora. El objetivo principal es aprender las bases necesarias para desarrollar una aplicación web completa con múltiples funcionalidades, aplicables tanto a futuros proyectos como al entorno profesional.

La web de Sephora destaca por ofrecer una experiencia de usuario clara, sencilla y atractiva, facilitando la navegación sin sobrecargar al usuario con demasiada información.

## Análisis de requerimientos
### Ususarios
La aplicación cuenta con tres tipos de usuarios:
- Visitante: puede navegar y visualizar productos
- Usuario registrado: puede gestionar su cuenta, favoritos y cesta
- Administrador: gestiona el contenido de la web

### Arquitectura
#### Front Office
- Visualización de productos
- Búsqueda y filtrado
- Paginación
- Registro y login con validación
#### Back Office
- Panel de administración
- Gestión de productos (CRUD)
- Conexión con API y base de datos

## Esquema de contenidos (Wireframes)
Se han diseñado wireframes para definir la estructura de las principales páginas:
- Home
- Listado de productos
- Detalle de producto
- Login / Registro
- Panel de administración

## Tecnologías utilizadas
### Frontend
HTML5 → estructura de la web
CSS3 → diseño y estilos
JavaScript → lógica y dinamismo
Bootstrap → diseño responsive

### Backend
Node.js → ejecución de JavaScript en servidor
Express → creación de API REST
MySQL → almacenamiento de datos

## Persistencia de datos
La aplicación utiliza una base de datos MySQL para almacenar información como:
- Usuarios
- Productos
- Datos relacionados con la aplicación

## Desarrollo del proyecto
### Configuración del entorno
Se instaló Node.js y las dependencias necesarias como Express. También se configuró la conexión con MySQL y la estructura del proyecto.

### Modelos, controladores y rutas
Se definieron los modelos de datos y se implementaron controladores y rutas para gestionar la lógica y las operaciones CRUD mediante una API REST.

### Vistas y funcionalidades
Se desarrollaron las vistas principales (home, productos, detalle, login, admin) implementando:
- Navegación
- Validación de formularios
- LocalStorage
- Peticiones a la API con fetch

# Conclusión
Este proyecto ha permitido desarrollar una aplicación web completa basada en un clon de Sephora, aplicando los conocimientos del módulo.

Se han cumplido objetivos como:
- Creación de una API REST
- Uso de JSON
- Conexión con base de datos
- Implementación de funcionalidades como búsqueda, filtrado y LocalStorage

## Aprendizaje y mejoras futuras
### Aprendizaje
Mejor comprensión de aplicaciones full-stack
Uso de APIs REST
Organización del código
### Mejoras futuras
Sistema de pagos
Autenticación con JWT
Recomendaciones de productos