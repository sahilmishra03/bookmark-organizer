# Bookmark Organizer  

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/sahilmishra03/bookmark-organizer/ci.yml?branch=main&label=CI&logo=github) ![License](https://img.shields.io/github/license/sahilmishra03/bookmark-organizer) ![Version](https://img.shields.io/badge/version-1.0.0-blue)  

**A modern, full‑stack web app to store, organise, tag and search your favourite links.**  

> **Live demo:** https://bookmark-organizer.vercel.app (or run locally)  

---  

## Table of Contents  

- [Overview](#overview)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Architecture](#architecture)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Backend Setup](#backend-setup)  
  - [Frontend Setup](#frontend-setup)  
- [Usage](#usage)  
  - [API Quick Start (cURL)](#api-quick-start)  
  - [Running the Frontend](#running-the-frontend)  
- [Development](#development)  
- [Deployment](#deployment)  
- [API Reference](#api-reference)  
- [Contributing](#contributing)  
- [Troubleshooting & FAQ](#troubleshooting--faq)  
- [Roadmap](#roadmap)  
- [License & Credits](#license--credits)  

---  

## Overview  

Bookmark Organizer is a **FastAPI + Next.js** application that lets you:

1. **Save** any URL with a title, description, and optional screenshot.  
2. **Organise** bookmarks into hierarchical folders.  
3. **Tag** bookmarks for powerful filtering.  
4. **Search** instantly across titles, URLs, tags and folder names.  
5. **Import / Export** your collection as JSON or CSV.  

Designed for developers, researchers, and anyone who wants a clean, self‑hosted alternative to commercial bookmark services.  

---  

## Features  

| Category | Feature | Status |
|----------|---------|--------|
| **Core** | Create / read / update / delete (CRUD) bookmarks | ✅ Stable |
| | Folder hierarchy (nested folders) | ✅ Stable |
| | Tag management (add / remove / filter) | ✅ Stable |
| | Full‑text search (PostgreSQL `tsvector`) | ✅ Stable |
| **Auth** | Email‑password registration & login (JWT + session) | ✅ Stable |
| | Password reset (email placeholder) | 🟡 Beta |
| **Import/Export** | Export all data as JSON or CSV | ✅ Stable |
| | Import from JSON/CSV with conflict handling | ✅ Stable |
| **UI** | Responsive dashboard (desktop & mobile) | ✅ Stable |
| | Dark / light theme toggle | ✅ Stable |
| | Drag‑and‑drop reordering of folders & bookmarks | 🟡 Beta |
| **DevOps** | Dockerised backend & frontend (optional) | ✅ Stable |
| | Alembic migrations for DB schema evolution | ✅ Stable |
| **Extras** | Clipboard copy button for URLs | ✅ Stable |
| | Browser extension placeholder (future) | ❌ Planned |

---  

## Tech Stack  

| Layer | Technology | Reason |
|-------|------------|--------|
| **Backend** | Python 3.11 | Modern, type‑hint friendly |
| | FastAPI | High‑performance async API, automatic OpenAPI docs |
| | SQLAlchemy 2.x + Alembic | ORM + migration tooling |
| | PostgreSQL (recommended) | Full‑text search & reliability |
| | Uvicorn | ASGI server |
| | Pydantic | Data validation & serialization |
| **Frontend** | Next.js 14 (React 18) | Server‑side rendering + API routes |
| | TypeScript | Type safety |
| | Tailwind CSS | Utility‑first styling |
| | shadcn/ui components | Consistent UI primitives |
| | Axios (via custom `api.ts`) | HTTP client |
| **Dev / CI** | Docker & Docker‑Compose | One‑command local environment |
| | GitHub Actions | CI lint, test, build |
| | ESLint + Prettier | Code quality |
| **Testing** | Pytest (backend) | Unit & integration tests |
| | Jest + React Testing Library (frontend) | Component tests |

---  

## Architecture  

```
repo/
├─ backend/                # FastAPI API
│  ├─ app/
│  │  ├─ config.py        # Pydantic settings (env vars)
│  │  ├─ database.py      # SQLAlchemy engine & session
│  │  ├─ models.py        # ORM models (User, Bookmark, Folder, Tag)
│  │  ├─ schemas.py       # Pydantic request/response schemas
│  │  ├─ routes/          # FastAPI routers (auth, bookmarks, folders, …)
│  │  └─ utils/           # Helper functions (hashing, token, pagination)
│  ├─ alembic/            # DB migration scripts
│  ├─ main.py             # FastAPI app entry point
│  └─ pyproject.toml      # Poetry/uv lock file
└─ frontend/               # Next.js UI
   ├─ app/                # App router (pages)
   │   ├─ (landing)/
   │   ├─ auth/
   │   ├─ dashboard/
   │   └─ … 
   ├─ components/         # Re‑usable UI components
   ├─ lib/                # API client, utils, types
   ├─ public/             # Static assets (logo, screenshots)
   ├─ next.config.ts
   └─ package.json
```

* **Backend** exposes a RESTful JSON API under `/api/v1/`. All routes are protected by JWT‑based authentication except `/auth/*`.  
* **Frontend** consumes the API via the thin wrapper in `lib/api.ts`. The UI is built with **shadcn/ui** components and Tailwind for rapid styling.  
* **Database** migrations are version‑controlled with Alembic; the current schema lives in `backend/alembic/versions/`.  

---  

## Getting Started  

### Prerequisites  

| Tool | Minimum version |
|------|-----------------|
| **Git** | 2.30+ |
| **Node.js** | 20.x (LTS) |
| **pnpm** | 8.x (recommended) |
| **Python** | 3.11 |
| **Docker** (optional) | 24.x |
| **PostgreSQL** | 14 (or use SQLite for quick start) |
| **Mail server** (for password reset) | optional – can use Mailtrap or console logging |

### Backend Setup  

1. **Clone the repo**  

   ```bash
   git clone https://github.com/sahilmishra03/bookmark-organizer.git
   cd bookmark-organizer/backend
   ```

2. **Create a virtual environment & install deps**  

   ```bash
   python -m venv .venv
   source .venv/bin/activate   # on Windows: .venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Configure environment variables**  

   Create a `.env` file in `backend/` (copy from `.env.example` if present):

   ```dotenv
   # core
   SECRET_KEY=super-secret-key-change-me
   DATABASE_URL=postgresql+psycopg2://postgres:postgres@localhost:5432/bookmark_db

   # optional email (for password reset)
   SMTP_HOST=smtp.mailtrap.io
   SMTP_PORT=2525
   SMTP_USER=your_user
   SMTP_PASS=your_pass
   ```

4. **Run database migrations**  

   ```bash
   alembic upgrade head
   ```

5. **Start the API**  

   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

   The API docs are available at `http://localhost:8000/docs`.

### Frontend Setup  

1. **Navigate to the frontend folder**  

   ```bash
   cd ../frontend
   ```

2. **Install dependencies**  

   ```bash
   pnpm install
   ```

3. **Create a `.env.local` file** (values are read by Next.js at build/runtime):

   ```dotenv
   NEXT_PUBLIC_API_URL=http://localhost:8000   # backend URL
   ```

4. **Run the development server**  

   ```bash
   pnpm dev
   ```

   Open `http://localhost:3000` in your browser.  

---  

## Usage  

### API Quick Start (cURL)  

> **Register a new user**

```bash
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"StrongP@ssw0rd"}'
```

> **Login & obtain a JWT**

```bash
TOKEN=$(curl -s -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"StrongP@ssw0rd"}' \
  | jq -r .access_token)
```

> **Create a folder**

```bash
curl -X POST http://localhost:8000/api/v1/folders \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Programming","parent_id":null}'
```

> **Add a bookmark**

```bash
curl -X POST http://localhost:8000/api/v1/bookmarks \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
        "url":"https://fastapi.tiangolo.com/",
        "title":"FastAPI – Modern, fast (high‑performance) web framework",
        "description":"Official FastAPI docs",
        "folder_id":1,
        "tags":["python","api"]
      }'
```

> **Search bookmarks**

```bash
curl -X GET "http://localhost:8000/api/v1/search?q=fastapi" \
  -H "Authorization: Bearer $TOKEN"
```

All endpoints follow standard REST conventions; see the **API Reference** section below for the full list.

### Running the Frontend  

```bash
pnpm dev          # development mode (hot reload)
pnpm build && pnpm start   # production build
```

*The UI automatically redirects to the login page if you are not authenticated.*  

---  

## Development  

| Task | Command |
|------|---------|
| **Run backend tests** | `cd backend && pytest` |
| **Run frontend tests** | `cd frontend && pnpm test` |
| **Lint backend** | `cd backend && ruff check .` |
| **Lint frontend** | `cd frontend && pnpm lint` |
| **Generate API client types** | `cd frontend && pnpm run generate:types` (uses `openapi-typescript`) |

### Code Style  

* **Python** – `ruff` + `black`.  
* **TypeScript** – `eslint` + `prettier`.  

Commit messages should follow the **Conventional Commits** format (e.g., `feat(auth): add password reset`).  

---  

## Deployment  

### Docker (recommended)  

A `docker-compose.yml` is provided at the repository root (not shown here). To spin up the full stack:

```bash
docker compose up --build
```

* The backend will be reachable at `http://localhost:8000`.  
* The frontend will be reachable at `http://localhost:3000`.  

### Vercel (frontend)  

1. Connect the `frontend/` directory to a Vercel project.  
2. Set the environment variable `NEXT_PUBLIC_API_URL` to your deployed backend URL.  

### Render / Railway (backend)  

Deploy the `backend/` folder as a **Python** service. Ensure the following env vars are set:

* `SECRET_KEY`
* `DATABASE_URL`
* (optional) SMTP variables for email.

### Production Considerations  

* Use **HTTPS** and set `https_only=True` in `SessionMiddleware`.  
* Enable **CORS** origins only for your domain.  
* Store secrets in a vault (e.g., AWS Secrets Manager, GCP Secret Manager).  
* Run database migrations on each deploy (`alembic upgrade head`).  

---  

## API Reference  

All endpoints are prefixed with `/api/v1`. The OpenAPI spec is auto‑generated and available at `/docs` (Swagger UI) and `/openapi.json`. Below is a concise overview.

| Method | Path | Auth | Description | Request Body (JSON) |
|--------|------|------|-------------|---------------------|
| **Auth** |
| POST | `/auth/register` | ❌ | Register a new user | `{ "email": "string", "password": "string" }` |
| POST | `/auth/login` | ❌ | Login, returns JWT & session cookie | `{ "email": "string", "password": "string" }` |
| POST | `/auth/logout` | ✅ | Invalidate session | – |
| POST | `/auth/refresh` | ✅ | Refresh JWT | – |
| **Folders** |
| GET | `/folders` | ✅ | List all folders (tree) | – |
| POST | `/folders` | ✅ | Create folder | `{ "name": "string", "parent_id": "int|null" }` |
| PATCH | `/folders/{id}` | ✅ | Update name / parent | `{ "name?": "string", "parent_id?": "int|null" }` |
| DELETE | `/folders/{id}` | ✅ | Delete folder (cascades) | – |
| **Bookmarks** |
| GET | `/bookmarks` | ✅ | List bookmarks (filter, pagination) | – |
| POST | `/bookmarks` | ✅ | Create bookmark | `{ "url": "string", "title": "string", "description?": "string", "folder_id?": "int", "tags?": ["string"] }` |
| GET | `/bookmarks/{id}` | ✅ | Retrieve single bookmark | – |
| PATCH | `/bookmarks/{id}` | ✅ | Update fields | Same shape as POST (partial) |
| DELETE | `/bookmarks/{id}` | ✅ | Delete bookmark | – |
| **Tags** |
| GET | `/tags` | ✅ | List all tags | – |
| POST | `/tags` | ✅ | Create a tag | `{ "name": "string" }` |
| DELETE | `/tags/{id}` | ✅ | Delete tag | – |
| **Search** |
| GET | `/search?q={query}` | ✅ | Full‑text search across bookmarks, folders, tags | – |
| **Import / Export** |
| GET | `/export?format=json|csv` | ✅ | Download all data | – |
| POST | `/import` | ✅ | Upload JSON/CSV to merge | `multipart/form-data` with file field `file` |
| **Health** |
| GET | `/health` | ❌ | Simple health check (`{"status":"ok"}`) | – |

**Error handling** – All errors follow the JSON schema:

```json
{
  "detail": "Human readable error message",
  "code": "error_code"
}
```

Common `code` values: `validation_error`, `unauthenticated`, `not_found`, `conflict`.

---  

## Contributing  

We welcome contributions! Please follow these steps:

1. **Fork** the repository and **clone** your fork.  
2. **Create a feature branch**: `git checkout -b feat/awesome-feature`.  
3. **Install the dev environment** (see *Getting Started*).  
4. **Write tests** for any new functionality.  
5. **Run the full test suite** (`pnpm test && pytest`).  
6. **Commit** using **Conventional Commits**.  
7. **Open a Pull Request** against `main`.  

### Code Review Checklist  

- [ ] Code follows the project's linting rules (`ruff`, `eslint`).  
- [ ] Types are correctly annotated (Python & TypeScript).  
- [ ] New endpoints have OpenAPI documentation (docstrings + `response_model`).  
- [ ] Tests cover at least 80 % of new lines.  
- [ ] README updated if user‑facing changes are introduced.  

### Local Development Tips  

- Use **Docker Compose** (`docker compose up -d db`) to spin up a PostgreSQL instance quickly.  
- The backend automatically reloads on file changes (`--reload`).  
- The frontend hot‑reload works out‑of‑the‑box with `pnpm dev`.  

---  

## Troubleshooting & FAQ  

| Problem | Solution |
|---------|----------|
| **`psycopg2` fails to install** | Ensure PostgreSQL dev libraries are present (`apt-get install libpq-dev` on Debian/Ubuntu or `brew install postgresql` on macOS). |
| **CORS error when frontend calls API** | Verify `allow_origins` in `backend/app/main.py` includes the correct URL (e.g., `http://localhost:3000`). |
| **Database migrations out of sync** | Run `alembic revision --autogenerate -m "describe change"` then `alembic upgrade head`. |
| **Forgot password reset email not sent** | Check SMTP env vars; for local dev you can set `SMTP_HOST=localhost` and run a dummy SMTP server (`python -m smtpd -c DebuggingServer -n localhost:1025`). |
| **Bookmarks not appearing after import** | Ensure the JSON structure matches the `ImportExportSchema` in `backend/app/schemas.py`. |
| **Frontend shows a blank page** | Open the browser console – look for 401 responses. Re‑login or clear cookies. |
| **Running tests fails on Windows** | Use WSL2 or a Linux VM, or switch to SQLite (`DATABASE_URL=sqlite+aiosqlite:///./test.db`). |

If you encounter a different issue, open an **issue** with logs and steps to reproduce.

---  

## Roadmap  

- **v1.1** – Browser extension for one‑click saving.  
- **v1.2** – Collaborative folders (shared collections).  
- **v2.0** – Mobile‑first native app (React Native).  
- **v2.1** – AI‑powered tag suggestions (OpenAI integration).  

---  

## License & Credits  

**License:** MIT © 2024‑2026 Sahil Mishra. See the `LICENSE` file for details.  

### Contributors  

- **Sahil Mishra** – Project author & maintainer  
- *(Add your name here when you contribute!)*  

### Acknowledgments  

- **FastAPI** – for the amazing async API framework.  
- **Next.js** – for the seamless React experience.  
- **shadcn/ui** – for beautiful, accessible UI primitives.  
- **Tailwind CSS** – for rapid styling.  

---  

*Happy bookmarking!*  