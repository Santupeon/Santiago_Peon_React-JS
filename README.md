# Tienda VR - Proyecto Final de React

Este proyecto es una aplicación de comercio electrónico front-end funcional, desarrollada como proyecto final para un curso de React. La aplicación simula una tienda de anteojos de Realidad Virtual, implementando un conjunto completo de características que incluyen autenticación de usuarios, gestión de productos, un carrito de compras y un diseño moderno y responsivo.

## 🚀 Funcionalidades Principales

### Para Usuarios
- **Autenticación de Usuarios:** Sistema de registro e inicio de sesión seguro.
- **Navegación Protegida:** Rutas privadas que solo son accesibles para usuarios autenticados.
- **Catálogo de Productos:** Visualización de productos con paginación y búsqueda en tiempo real.
- **Detalles del Producto:** Página dedicada para cada producto con sus características.
- **Carrito de Compras:** Funcionalidad completa para añadir, ver y eliminar productos del carrito.

### Para Administradores
- **Rol de Administrador:** Un rol de usuario especial con permisos elevados.
- **Gestión de Productos (CRUD):**
  - **Crear:** Formulario para añadir nuevos productos a la tienda.
  - **Leer:** Visualización de todos los productos.
  - **Actualizar:** Formulario para editar la información de productos existentes.
  - **Eliminar:** Opción para borrar productos del catálogo con un modal de confirmación.

### Diseño y Experiencia de Usuario
- **Diseño Responsivo:** La interfaz se adapta fluidamente a diferentes tamaños de pantalla (móvil, tablet, escritorio) usando React Bootstrap.
- **Componentes Estilizados:** Uso de `styled-components` para un diseño modular y mantenible.
- **Notificaciones Modernas:** `React Toastify` para feedback al usuario (ej. "Producto añadido con éxito").
- **Iconografía Clara:** `React Icons` para mejorar la usabilidad de botones y widgets.
- **SEO y Títulos Dinámicos:** `React Helmet Async` para gestionar los títulos de las pestañas del navegador, mejorando la experiencia y el SEO.

## 🛠️ Tecnologías Utilizadas

*   **Framework:** React
*   **Bundler:** Vite
*   **Enrutamiento:** React Router
*   **Gestión de Estado:** React Context API
*   **Estilos:**
    *   React Bootstrap (para la estructura y la grilla responsiva)
    *   Styled-components (para estilos a nivel de componente)
    *   CSS plano para estilos globales.
*   **UI y UX:**
    *   React Icons
    *   React Toastify
*   **SEO:** React Helmet Async
*   **Backend (Simulado):** MockAPI

## ⚙️ Instalación y Uso Local

Para ejecutar este proyecto en tu máquina local, sigue estos pasos:

1.  **Clona el repositorio:**
    ```bash
    git clone <URL-del-repositorio>
    ```
2.  **Navega a la carpeta del proyecto:**
    ```bash
    cd <nombre-de-la-carpeta>
    ```
3.  **Instala las dependencias:**
    ```bash
    npm install
    ```
4.  **Ejecuta la aplicación en modo de desarrollo:**
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:5173` (o el puerto que indique Vite).
