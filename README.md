# Alrededor de los EE.UU. — Versión React

Aplicación web de una página (SPA) donde el usuario puede compartir fotos de lugares, dar y quitar "me gusta", eliminar tarjetas, editar su perfil y cambiar su avatar. Todos los datos se sincronizan con una API remota.

Este proyecto es la migración a **React** del proyecto original en JavaScript "vanilla", desarrollada como parte del sprint 15 del bootcamp de TripleTen. El foco del sprint fue el manejo de estado en React y el envío de datos a una API.

## Funcionalidades

- Carga de las tarjetas y de la información del usuario desde la API al iniciar la aplicación.
- Dar y quitar "me gusta" a las tarjetas, con persistencia en el servidor.
- Eliminar tarjetas.
- Editar el nombre y la descripción del perfil mediante un formulario controlado.
- Cambiar el avatar mediante un formulario que lee el input con `ref`.
- Agregar tarjetas nuevas, que aparecen al principio de la galería.
- Cierre automático de las ventanas emergentes tras una operación exitosa.

## Tecnologías y conceptos aplicados

- **React 19** con componentes funcionales y Hooks.
- **Vite** como entorno de desarrollo y empaquetado.
- **Hooks:** `useState`, `useEffect`, `useContext`, `useRef`.
- **Context API** (`CurrentUserContext`) para compartir el usuario actual y los controladores entre componentes sin "prop drilling".
- **Levantamiento de estado:** el estado de las tarjetas y de las ventanas emergentes vive en el componente raíz `App` y baja por props.
- **Formularios controlados** (edición de perfil) y **acceso directo al DOM con refs** (avatar y nueva tarjeta), como las dos formas de leer un formulario.
- **Manejo inmutable del estado** con `map`, `filter` y el operador de propagación (`...`).
- Comunicación con la API mediante una clase `Api` reutilizable basada en `fetch`.

## Estructura del proyecto

```
src/
├── App.jsx                      # Componente raíz: estado de usuario, tarjetas y popups
├── main.jsx                     # Punto de entrada
├── contexts/
│   └── CurrentUserContext.js    # Contexto del usuario actual
├── utils/
│   └── api.js                   # Clase Api e instancia configurada
├── components/
│   ├── Header/
│   ├── Footer/
│   └── Main/
│       ├── Main.jsx             # Perfil, galería y montaje de popups
│       └── components/
│           ├── Card/            # Tarjeta individual (like y borrado)
│           ├── Popup/           # Ventana emergente genérica
│           ├── ImagePopup/      # Vista ampliada de la imagen
│           └── form/
│               ├── EditProfile/ # Formulario controlado
│               ├── EditAvatar/  # Formulario con ref
│               └── NewCard/     # Formulario con refs
├── blocks/                      # Estilos CSS por bloque (BEM)
├── vendor/                      # Fuentes y normalize
└── images/                      # Recursos gráficos
```

## Instalación y uso

Requisitos: Node.js y npm.

```bash
# Clonar el repositorio
git clone https://github.com/gitalffa/web_project_around_react.git
cd web_project_around_react

# Instalar dependencias
npm install

# Levantar el servidor de desarrollo (se abre en http://localhost:3000)
npm run dev
```

Otros scripts disponibles:

```bash
npm run build     # Genera la versión de producción
npm run preview   # Sirve localmente la versión de producción
npm run lint      # Ejecuta ESLint
```

## API

La aplicación consume la API de TripleTen:

```
https://around-api.es.tripleten-services.com/v1
```

La clase `Api` (`src/utils/api.js`) centraliza las peticiones: obtener el usuario y las tarjetas, actualizar perfil y avatar, agregar y eliminar tarjetas, y cambiar el estado de "me gusta". El token de autorización se configura al crear la instancia.

## Pendientes

- Secciones de clima (geolocalización) e imagen del día de la NASA: el maquetado está presente pero comentado; la integración con sus APIs queda pendiente como mejora posterior.
- Mejoras opcionales sugeridas por el bootcamp: validación de formularios, indicadores de carga y ventana de confirmación antes de eliminar una tarjeta.

## Autor

Fabricio Galindo Copado
GitHub: [gitalffa](https://github.com/gitalffa)
