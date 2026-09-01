# Funeraria Digital Doc - Frontend

Web application built to simplify the daily operations of funeral homes. The platform centralizes client information, death declarations and legal documentation in a single place, allowing staff to register records, generate the different document templates required for a funeral, manage users and groups, and track statistics.

This repository contains the frontend client, built with Vue 3, TypeScript and Vuetify, consuming a Django REST Framework API.

> **Status:** frontend client for the Funeraria Digital Doc backend — prototype exercised with synthetic data; deployed via Firebase Hosting + GitHub Actions.

## Tech Stack

* Vue 3 (Composition API) with TypeScript
* Vite as build tool and dev server
* Vuetify 3 for UI components
* Vue Router 4 for client side routing and role based navigation guards
* Axios for HTTP requests, with JWT based authentication
* Vue3 ApexCharts for statistics and reporting charts
* Vue Leaflet for map based location display
* Firebase Hosting for deployment
* ESLint and Prettier for linting and code formatting

## Features

* JWT authentication with role based access control (public, user, staff and super roles)
* Multi-tenant: the SPA serves one funeral home (group) per logged-in user, with a public page per group
* Records management: create, edit, list and export death declarations
* Dynamic, configurable document templates used to generate the paperwork required for each funeral
* User and group management for funeral home staff
* Statistics dashboard with charts (records per day, per month, deaths by district, deaths by user)
* Public facing page per funeral home, with services, locations and contact information
* Responsive layout for desktop and mobile usage

## Project Structure

```
src/
  api/            HTTP client and endpoint definitions per domain (records, users, groups, templates, stats)
  authorizations/ Route level role based access control
  components/     Shared and reusable Vue components
  composables/    Reusable composition functions (user session, snackbar, loading spinner, media queries)
  models/         TypeScript interfaces and types
  router/         Application routes
  utils/          Generic helper functions
  views/          Page level components, one folder per feature/route
```

## Role-based access (end-to-end)

The role is resolved once at login (JWT) and applied at two layers, mirroring the backend RBAC:

| Role | SPA capability |
| --- | --- |
| `public` | Public group page only (slug-based: services, locations, contacts), plus home/about |
| `user` | Own group's records (create, edit, list) and profile |
| `staff` | + user management and the statistics dashboard |
| `super` | + group management and document template management |

Route guards in `src/authorizations/` enforce this client-side (fast redirect + UX); the API enforces the same rules server-side, so the guards are a convenience layer, **not** the security boundary.

## Prerequisites

* Node.js 20 or later
* npm
* A running instance of the backend API

## Getting Started

Install the dependencies:

```sh
npm install
```

Create a `.env` file in the project root with the backend API URL:

```sh
VITE_API_BASE_URL=http://localhost:8000/
```

Start the development server:

```sh
npm run dev
```

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server with hot reload |
| `npm run build` | Type checks and builds the app for production |
| `npm run build-only` | Builds the app for production without type checking |
| `npm run preview` | Serves the production build locally |
| `npm run type-check` | Runs TypeScript type checking with vue-tsc |
| `npm run lint` | Lints and auto fixes the codebase with ESLint |
| `npm run deploy` | Builds the app and deploys it to Firebase Hosting |

## Deployment

The application is deployed to Firebase Hosting. Continuous deployment is configured through GitHub Actions: on every pull request merged into `main`, the workflow installs dependencies, builds the project and publishes it automatically.

## Recommended IDE Setup

VS Code with the Volar extension for Vue 3 and TypeScript support.
