# FakeFlix Masterclass

> Material educativo de una masterclass técnica para desarrolladoras Junior/Mid.
> Partimos de un MVP de videoclub escrito como código espagueti y lo evolucionamos, paso a paso, hacia los estándares de la industria.

---

## 🎯 Objetivo pedagógico

Este repositorio no enseña a construir FakeFlix. Enseña a **mejorar** FakeFlix.

Cada bloque (`apps/00-seed` → `apps/04-final`) representa una iteración real de refactorización. El mismo producto, el mismo API, el mismo CSS — pero con decisiones técnicas cada vez más maduras. Al terminar el recorrido completo, habrás trabajado con los cuatro pilares que diferencian el código junior del código senior:

| Bloque | Tema | Lo que aprenderás |
| --- | --- | --- |
| `00-seed` | Punto de partida | Reconocer código espagueti y sus consecuencias |
| `01-architecture` | Arquitectura | Screaming Architecture y Atomic Design |
| `02-testing` | Testing | Vitest, React Testing Library y el patrón AAA |
| `03-performance` | Rendimiento | Debounce y TanStack Query |
| `04-final` | TypeScript estricto | Eliminar `any`, tipar contratos, seguridad en URLs |

---

## 🗂️ Estructura del monorepo

```plaintext
fakeflix-masterclass/
├── apps/
│   ├── 00-seed/          # MVP original — código espagueti de referencia
│   ├── 01-architecture/  # Refactor de arquitectura con Screaming + Atomic Design
│   ├── 02-testing/       # Entorno de tests con Vitest y RTL
│   ├── 03-performance/   # Optimización con useDebounce y TanStack Query
│   └── 04-final/         # Versión final — TypeScript strict, 0 any
├── packages/
│   ├── api/              # Servidor Express con SQLite en memoria
│   └── database/         # Capa de datos: seed de 15 películas B-movie
├── docs/                 # Explicación escrita de cada bloque
├── package.json          # Scripts raíz del monorepo
└── pnpm-workspace.yaml   # Configuración del workspace
```

### `apps/` — Los cinco bloques

#### `00-seed` — El punto de partida

El MVP funcional con todos los antipatrones intactos: variables sin nombre (`temp`, `flag`, `data1`, `x1`), `any` por todas partes, sin arquitectura de carpetas, sin tests y sin control del rendimiento. Es el código de referencia que iremos mejorando.

#### `01-architecture` — Screaming Architecture + Atomic Design

Primera refactorización. Reorganiza el proyecto para que la estructura de carpetas *grite* lo que hace la aplicación (`movies/`, `favorites/`, `search/`). Aplica Atomic Design en la capa de UI (`atoms/`, `organisms/`, `templates/`). Sin funcionalidad nueva — solo estructura.

#### `02-testing` — Vitest + React Testing Library

Configura el entorno de tests desde cero y escribe 13 tests (unitarios e integración) siguiendo el patrón **AAA** (Arrange, Act, Assert). Cubre hooks, componentes y páginas completas montando la aplicación real.

#### `03-performance` — Debounce + TanStack Query

Elimina los tres grandes problemas de rendimiento heredados del seed: el Thundering Herd (fetch por cada tecla), la gestión manual de estado asíncrono con `useEffect` y el re-fetch innecesario del catálogo completo al marcar un favorito.

#### `04-final` — TypeScript estricto

Versión de producción. Sustituye todos los `any` por interfaces tipadas, protege las URLs con `encodeURIComponent`, añade `type="button"` explícito y combina los estados de carga. El compilador actúa como primer revisor de código.

### `packages/` — Infraestructura compartida

#### `@fakeflix/api`

Servidor Express con SQLite **en memoria** que sirve de backend para todos los bloques. Se levanta automáticamente con cada script `dev:*`. Expone:

- `GET /api/movies` — catálogo con filtros opcionales `?search=` y `?isFavorite=`
- `PATCH /api/movies/:id/favorite` — marcar/desmarcar favorito
- `GET /docs` — documentación Swagger interactiva

#### `@fakeflix/database`

Paquete interno que inicializa la base de datos SQLite con 15 películas B-movie (Sharknado, The Room, Birdemic...) y expone las funciones de acceso a datos usadas por la API.

---

## ⚙️ Prerrequisitos

- **Node.js** `>= 18`
- **pnpm** `>= 8`

Si no tienes pnpm instalado:

```bash
npm install -g pnpm
```

---

## 🚀 Instalación

Clona el repositorio e instala todas las dependencias del monorepo desde la raíz. pnpm se encarga de instalar los paquetes de todos los `apps/*` y `packages/*` a la vez:

```bash
git clone https://github.com/Mixlabs/react-code-clinic.git
cd react-code-clinic
pnpm install
```

---

## 📟 Scripts disponibles

Todos los scripts se ejecutan desde la **raíz del monorepo**. Cada `dev:*` levanta la aplicación correspondiente junto con la API.

### Levantar aplicaciones

```bash
# Levantar solo la API (útil para probarla con Postman/Swagger)
pnpm dev:api

# Bloque 00 — seed (código espagueti)
pnpm dev:seed

# Bloque 01 — arquitectura
pnpm dev:architecture

# Bloque 02 — testing
pnpm dev:testing

# Bloque 03 — performance
pnpm dev:performance

# Bloque 04 — versión final
pnpm dev:final
```

### Ejecutar tests

```bash
# Bloque 02
pnpm test:testing           # ejecución única
pnpm test:testing:watch     # modo watch (re-ejecuta al guardar)
pnpm test:testing:coverage  # con informe de cobertura

# Bloque 03
pnpm test:performance
pnpm test:performance:watch
pnpm test:performance:coverage

# Bloque 04
pnpm test:final
pnpm test:final:watch
pnpm test:final:coverage
```

### Build de producción

```bash
# Compila todos los apps en paralelo
pnpm build
```

---

## 🌐 URLs de acceso

| Servicio | URL | Descripción |
| --- | --- | --- |
| `00-seed` | [http://localhost:5173](http://localhost:5173) | Versión espagueti |
| `01-architecture` | [http://localhost:5174](http://localhost:5174) | Arquitectura limpia |
| `02-testing` | [http://localhost:5175](http://localhost:5175) | Con suite de tests |
| `03-performance` | [http://localhost:5176](http://localhost:5176) | Con TanStack Query |
| `04-final` | [http://localhost:5177](http://localhost:5177) | Versión final tipada |
| API REST | [http://localhost:3000/api/movies](http://localhost:3000/api/movies) | Endpoint principal |
| Swagger UI | [http://localhost:3000/docs](http://localhost:3000/docs) | Documentación interactiva |

---

## 🛠️ Stack tecnológico

| Categoría | Tecnología |
| --- | --- |
| UI | React 18 |
| Lenguaje | TypeScript 5 (modo `strict`) |
| Bundler | Vite 5 |
| Testing | Vitest 3 + React Testing Library 16 |
| Server state | TanStack Query v5 |
| Backend | Express 4 + better-sqlite3 |
| Gestor de paquetes | pnpm 11 (workspaces) |

---

## 📚 Documentación por bloque

Cada iteración tiene su propio documento explicativo en `/docs`:

- [docs/00-seed-bad-practices.md](docs/00-seed-bad-practices.md) — Catálogo de antipatrones del seed
- [docs/01-architecture-explanation.md](docs/01-architecture-explanation.md) — Screaming Architecture y Atomic Design
- [docs/02-testing-explanation.md](docs/02-testing-explanation.md) — Configuración de Vitest y patrón AAA
- [docs/03-performance-explanation.md](docs/03-performance-explanation.md) — Debounce y TanStack Query
- [docs/04-final-explanation.md](docs/04-final-explanation.md) — TypeScript estricto y buenas prácticas finales
