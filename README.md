# TestCommerce - Entorno de Pruebas Visuales y E2E 🧪🛒

TestCommerce es una aplicación web simulada de comercio electrónico con un diseño de _Corporate Modernism_. Este repositorio está diseñado específicamente para servir como entorno de pruebas (sandbox) para automatización QA, implementando el patrón Page Object Model (POM) y metodologías BDD (Behavior-Driven Development).

🔗 **URL del Repositorio:** [https://github.com/Qualisophy/visual-testing](https://github.com/Qualisophy/visual-testing)
🔗 **URL de Clonación:** `https://github.com/Qualisophy/visual-testing.git`
🌐 **Entorno de Pruebas (Producción):** [https://visual-testing.vercel.app/](https://visual-testing.vercel.app/)

---

## 🛠️ Tecnologías Utilizadas

El proyecto está dividido en dos capas principales:

**Frontend (Aplicación Web):**

- **Astro:** Framework web principal para renderizado estático ultrarrápido.
- **React:** Utilizado para componentes interactivos aislados en el cliente (ej. Notificaciones Toast).
- **Tailwind CSS (v4):** Sistema de diseño y estilos globales.
- **TypeScript:** Tipado estricto en todo el código fuente.

**QA / Automatización:**

- **Playwright:** Framework principal para pruebas End-to-End (E2E) e interacción con el navegador.
- **Applitools Eyes:** Integración de Inteligencia Artificial para pruebas de regresión visual.

---

## 📋 Requisitos Previos

Antes de clonar el proyecto en un nuevo equipo, asegúrate de tener instalado lo siguiente:

1. **Node.js:** Versión `20.0.0` o superior. (Puedes comprobar tu versión ejecutando `node -v` en la terminal).
2. **Git:** Para la gestión de versiones y clonación del repositorio.
3. **Clave API de Applitools:** Necesaria para ejecutar las validaciones visuales. (Puedes obtener una cuenta gratuita en [applitools.com](https://applitools.com/)).

---

## 🚀 Guía de Instalación (Paso a Paso)

Sigue estas instrucciones para configurar el proyecto en un equipo desde cero:

**1. Clonar el repositorio:**

```bash
git clone [https://github.com/Qualisophy/visual-testing.git](https://github.com/Qualisophy/visual-testing.git)
cd visual-testing
```

**2. Instalar las dependencias del proyecto:**

```bash
npm install
```

**3. instalar los navegadores de playwright:**

Playwright necesita descargar los binarios de los navegadores (Chromium, Firefox, WebKit) para poder ejecutar las pruebas.

```bash
npx playwright install chromium
```

**4. Configurar las Variables de Entorno:**

Crea un archivo llamado .env en la raíz del proyecto (al mismo nivel que el package.json). Añade tu clave de Applitools dentro del archivo:

```bash
APPLITOOLS_API_KEY=tu_clave_api_aqui
```

## 🧪 Ejecución de Pruebas Automatizadas

El proyecto está configurado para ejecutar pruebas directamente contra el entorno desplegado en Vercel.

Existen dos maneras principales de lanzar los tests, dependiendo de si quieres ver el navegador en acción o ejecutarlo de forma invisible (ideal para CI/CD):

Modo 1: Pruebas con Navegador Visible (Headed)
Recomendado para depurar y visualizar cómo el robot interactúa con la página.

Para ejecutar el Test Visual (Login):

```bash
npx playwright test src/tests/visual/login-bdd.spec.ts --headed
```

Para ejecutar el Test E2E Completo (Flujo de Compra):

```bash
npx playwright test src/tests/e2e/purchase-bdd.spec.ts --headed
```

Modo 2: Pruebas en Segundo Plano (Headless)
Recomendado para máxima velocidad y ejecución en servidores o pipelines. El navegador no se mostrará en pantalla.

Para ejecutar toda la suite de pruebas (Visual y E2E):

```bash
npx playwright test
```

Nota sobre Resultados Visuales: Una vez finalizadas las pruebas que incluyen eyes.check(), debes dirigirte al Dashboard de Applitools para revisar, aceptar o rechazar las posibles diferencias visuales detectadas por la IA. Para ver el reporte HTML interno de Playwright, ejecuta npx playwright show-report.

## 💻 Desarrollo Local de la Aplicación Web

Si deseas levantar la aplicación en tu entorno local para realizar modificaciones en el código fuente (Astro/React/Tailwind):

```bash
npm run dev //Inicia el servidor de desarrollo local en http://localhost:4321
```

```bash
npm run build //Compila la aplicación para producción en la carpeta ./dist/
```

```bash
npm run preview //Previsualiza la compilación de producción en local
```

## 📂 Estructura del Proyecto

A continuación se detalla la arquitectura de carpetas y archivos del repositorio:

```bash
── .gitignore
├── astro.config.mjs
├── package-lock.json
├── package.json
├── playwright-report
│   └── index.html
├── playwright.config.ts
├── public
│   ├── favicon.ico
│   └── favicon.svg
├── README.md
├── src
│   ├── .DS_Store
│   ├── assets
│   │   ├── .DS_Store
│   │   └── logo.png
│   ├── components
│   │   ├── .DS_Store
│   │   ├── cart
│   │   ├── Footer.astro
│   │   ├── Header.astro
│   │   ├── inventory
│   │   ├── login
│   │   └── shared
│   │       ├── .DS_Store
│   │       └── ui
│   │           ├── .DS_Store
│   │           ├── Button.tsx
│   │           └── Toast.tsx
│   ├── layouts
│   │   └── Layout.astro
│   ├── pages
│   │   ├── carrito.astro
│   │   ├── confirmacion.astro
│   │   ├── index.astro
│   │   ├── productos.astro
│   │   └── resumen.astro
│   ├── styles
│   │   └── global.css
│   ├── test-results
│   └── tests
│       ├── e2e
│       │   └── purchase-bdd.spec.ts
│       ├── pages
│       │   ├── LoginPage.ts
│       │   └── StoreApp.ts
│       ├── utils
│       │   └── eyesSetup.ts
│       └── visual
│           └── login-bdd.spec.ts
├── stitch_astro_ecommerce_mvp.zip
├── test-results
│   └── .last-run.json
└── tsconfig.json

```
