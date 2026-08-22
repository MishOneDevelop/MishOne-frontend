# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

MishOne-frontend: Angular 20 standalone-components frontend for a services/portfolio business site (home, servicios, portafolio, contacto). Both `bun.lock` and `package-lock.json` are committed; `package-lock.json` is the one that's kept current, so use `npm`.

## Commands

- `ng serve` / `npm start` — dev server (uses `development` config by default, unminified, sourcemaps on).
- `ng build` — production build (default config is `production`, with bundle budgets: 500kB warn / 1MB error initial).
- `ng build --watch --configuration development` — watch build.
- `ng test` — Karma + Jasmine unit tests, launches Chrome.
  - Single file: Karma runs the whole suite per launch; narrow with `ng test --include='**/servicios.component.spec.ts'`.

No lint script is configured in `package.json`.

## Architecture

**Standalone components only** — no `NgModule`s. Routing and providers are wired directly:
- `src/app/app.routes.ts` — all feature routes are lazy-loaded via `loadComponent()`. Unknown paths and `''` redirect to `home`.
- `src/app/app.config.ts` — router + zone change detection providers.
- `src/main.ts` — bootstraps `App` with `appConfig.providers` **plus** `provideHttpClient()` and `provideAnimations()`, which are added here rather than in `app.config.ts`. Keep that split in mind before adding new global providers (HTTP interceptors, etc. belong in `main.ts` alongside `provideHttpClient`).
- `src/app/app.ts` — root shell: renders `Navbar` + `RouterOutlet` + `Footer`, and defines the `routeAnimations` fade/slide transition used on route changes.

**Feature structure** (`src/app/components/`):
- `layauts/` — `navbar` and `footer`, wrapping every page (note the folder name is `layauts`, not `layouts`).
- `modulos/` — one folder per route/feature: `home`, `servicios` (with a nested `servicios-detalle` for the `servicios/detalle/:id` route), `portafolio`, `contacto`. Each component pairs a `.ts`/`.html`/`.css`/`.spec.ts`.

**Data layer** (`src/app/core/`):
- `services/` — thin `HttpClient` wrappers, one per resource (`ServicioService`, `DetalleServicioService`, `ContactoService`, `PingService`), all `providedIn: 'root'`, all built on `environment.apiBaseUrl`. Components call these directly and hold results in signals (e.g. `servicios = signal<Servicio[]>([])`) — no shared state/store layer.
- `models/` — plain interfaces matching backend DTOs (`Servicio`, `DetalleServicio`, `Contacto`), plus `models/dto/` for shared nested shapes (`ValorParametro`).

**Backend**: separate service (`mishone-backend`), REST API under `/api`. Base URL is swapped per environment in `src/environments/`:
- `environment.ts` (dev) points at the deployed Render backend (`https://mishone-backend.onrender.com/api`); the local `http://localhost:8080/api` option is commented out inline.
- `environment.prod.ts` points at `https://mishone-backend.com/api`.

**Styling**: Tailwind CSS v4 via `@tailwindcss/postcss` (see `.postcssrc.json`); `tailwind.config.js` scans `src/**/*.{html,ts}` with no custom theme/plugins yet.
