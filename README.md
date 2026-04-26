# Bookmark‑Organizer 🚀  

![GitHub release (latest by date)](https://img.shields.io/github/v/release/sahilmishra03/bookmark-organizer)  
![GitHub license](https://img.shields.io/github/license/sahilmishra03/bookmark-organizer)  
![Docker Pulls](https://img.shields.io/docker/pulls/sahilmishra03/bookmark-organizer)  
![CI Status](https://img.shields.io/github/actions/workflow/status/sahilmishra03/bookmark-organizer/ci.yml?branch=main&label=CI)  

**Demo**: https://bookmark-organizer.vercel.app/ | **Docs**: https://github.com/sahilmishra03/bookmark-organizer/wiki  

---  

## Overview  

**Bookmark‑Organizer** is a full‑stack web application that lets you save any kind of link, file, or note and retrieve it instantly from any device.  
- **Save** – Store URLs, PDFs, images, or plain‑text notes with tags and optional descriptions.  
- **Search** – Powerful full‑text search across titles, tags, and content.  
- **Organise** – Group bookmarks into collections, pin favourites, and share read‑only links.  

Built with **FastAPI** on the backend and **Next.js 14 (App Router)** on the frontend, the project follows a clean, modular architecture that is easy to extend and self‑host.

> **Target audience** – developers who need a personal knowledge‑base, teams looking for a lightweight internal link manager, or anyone who wants a privacy‑first alternative to commercial bookmark services.

Current version: **v1.0.0** (stable).

---  

## Features  

| Feature | Description | Status |
|---------|-------------|--------|
| **Bookmark CRUD** | Create, read, update, delete bookmarks with optional tags, notes, and attachments. | ✅ Stable |
| **Full‑text search** | Search by title, URL, tags, or note content (PostgreSQL `tsvector` based). | ✅ Stable |
| **Collections** | Group bookmarks into user‑defined collections; reorder via drag‑and‑drop. | ✅ Stable |
| **Tag cloud** | Visual tag cloud with click‑to‑filter. | ✅ Stable |
| **Dark / Light theme** | System‑aware theming powered by `next-themes`. | ✅ Stable |
| **Responsive UI** | Mobile‑first design with Tailwind CSS and shadcn/ui components. | ✅ Stable |
| **API authentication** | JWT‑based auth (login, register, token refresh). | ✅ Stable |
| **Export / Import** | JSON export of all bookmarks; import restores them. | 🟡 Beta |
| **Docker support** | One‑command containerised deployment for both backend and frontend. | ✅ Stable |
| **OpenAPI docs** | Auto‑generated Swagger UI at `/docs`. | ✅ Stable |

---  

## Tech Stack  

| Layer | Technology | Reason |
|-------|------------|--------|
| **Backend** | FastAPI (Python 3.12) | High‑performance async API, automatic OpenAPI generation |
| | Pydantic / Annotated‑types | Data validation & serialization |
| | SQLModel (SQLAlchemy) + PostgreSQL | ORM with type‑hints, easy migrations |
| | Uvicorn | ASGI server |
| | Pytest + HTTPX | Unit & integration testing |
| **Frontend** | Next.js 14 (App Router) + TypeScript | Server‑side rendering, file‑based routing |
| | React 18 | UI library |
| | Tailwind CSS + shadcn/ui | Utility‑first styling, accessible components |
| | next‑auth (custom JWT) | Simple auth flow |
| | Axios | HTTP client |
| **DevOps** | Docker Compose | Multi‑container orchestration |
| | GitHub Actions | CI pipeline (lint, test, build) |
| | Vercel (optional) | Zero‑config frontend hosting |
| **Other** | dotenv | Environment variable management |
| | Sentry (optional) | Error monitoring |

---  

## Architecture  

```
repo/
├─ backend/
│  ├─ app/
│  │  ├─ __init__.py          # FastAPI app factory
│  │  ├─ main.py              # entry point (uvicorn)
│  │  ├─ config.py            # pydantic settings (env vars)
│  │  ├─ database.py          # SQLModel engine & session
│  │  ├─ models.py            # DB models (User, Bookmark, Collection)
│  │  ├─ schemas.py           # Pydantic request/response schemas
│  │  └─ routes/              # routers (auth, bookmarks, collections)
│  ├─ pyproject.toml
│  └─ requirements.txt
└─ frontend/
   ├─ app/
   │  ├─ layout.tsx           # Root layout + ThemeProvider
   │  └─ page.tsx             # Home page (search + list)
   ├─ components/            # UI primitives (ui/, home/, layout/)
   ├─ lib/
   │  └─ utils.ts             # helper functions (api client, formatters)
   ├─ public/                # static assets (icons, logo)
   ├─ next.config.ts
   └─ package.json
```

*The backend exposes a RESTful JSON API under `/api/v1`. The frontend consumes this API via a thin Axios wrapper (`lib/utils.ts`). All secrets (DB URL, JWT secret) are loaded from `.env` files – never committed.*

---  

## Getting Started  

### Prerequisites  

| Tool | Minimum version |
|------|-----------------|
| **Docker** | 24.0+ |
| **Docker Compose** | 2.20+ |
| **Node.js** | 20.x |
| **pnpm** (recommended) | 9.x |
| **Python** | 3.12 |
| **PostgreSQL** (if running locally without Docker) | 15 |

> **Note** – The project can be run **entirely inside Docker**; you only need Docker & Docker Compose.

### Installation (Docker‑first)  

```bash
# 1️⃣ Clone the repo
git clone https://github.com/sahilmishra03/bookmark-organizer.git
cd bookmark-organizer

# 2️⃣ Copy example env files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env   # (if present)

# 3️⃣ Build and start containers
docker compose up --build -d
```

The API will be reachable at `http://localhost:8000/api/v1` and the UI at `http://localhost:3000`.

### Local development (without Docker)  

#### Backend  

```bash
# Inside backend/
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# Create a local PostgreSQL DB (or use Docker)
export DATABASE_URL=postgresql+psycopg2://postgres:postgres@localhost:5432/bookmark
export JWT_SECRET_KEY=super-secret-key
uvicorn app.main:app --reload
```

#### Frontend  

```bash
# Inside frontend/
pnpm install
pnpm dev
```

### Configuration  

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL DSN | `postgresql+psycopg2://user:pass@db:5432/bookmark` |
| `JWT_SECRET_KEY` | Secret for signing JWTs | `my-very-secret-key` |
| `ALLOWED_ORIGINS` | CORS whitelist (comma‑separated) | `http://localhost:3000` |
| `NEXT_PUBLIC_API_URL` | Base URL for the backend API (frontend) | `http://localhost:8000/api/v1` |
| `PORT` (backend) | Port for Uvicorn | `8000` |
| `NEXT_PUBLIC_APP_NAME` | Display name used in UI | `Bookmark‑Organizer` |

A minimal `.env.example` is provided in each sub‑project.

---  

## Usage  

### API Quickstart  

```bash
# Register a new user
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","password":"StrongP@ssw0rd"}'

# Login → obtain JWT
TOKEN=$(curl -s -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","password":"StrongP@ssw0rd"}' | jq -r .access_token)

# Create a bookmark
curl -X POST http://localhost:8000/api/v1/bookmarks \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
        "title": "FastAPI docs",
        "url": "https://fastapi.tiangolo.com",
        "tags": ["python","api"],
        "notes": "Great async framework"
      }'
```

Open `http://localhost:3000` in a browser, sign in with the same credentials, and you’ll see the newly created bookmark instantly.

### Frontend  

- **Development**: `pnpm dev` → `http://localhost:3000`  
- **Production build**: `pnpm build && pnpm start`  
- **Storybook** (if added later): `pnpm storybook`

#### Example UI flow  

1. **Login** – Email + password form (JWT stored in `localStorage`).  
2. **Add Bookmark** – Click the “+” button → modal with fields (title, URL, tags, notes, optional file upload).  
3. **Search** – Type in the top bar; results filter in real‑time.  
4. **Collections** – Drag bookmarks into a collection from the sidebar.  

Screenshots:  

![Home screen](frontend/public/bookmark.png)  
*Home page showing search bar, tag cloud, and recent bookmarks.*

---  

## Development  

| Task | Command |
|------|---------|
| **Run backend tests** | `cd backend && pytest` |
| **Run frontend lint** | `cd frontend && pnpm lint` |
| **Run full stack locally** | `docker compose up --build` |
| **Check type safety (backend)** | `cd backend && mypy .` |
| **Check type safety (frontend)** | `cd frontend && pnpm typecheck` |

### Code style  

- **Python** – Black, isort, flake8 (configured in `backend/.flake8`).  
- **TypeScript** – ESLint + Prettier (see `frontend/eslint.config.mjs`).  

### Debugging  

- Backend logs are streamed to the console (`docker compose logs -f backend`).  
- Frontend hot‑module reload works out‑of‑the‑box with `pnpm dev`.  
- Use the built‑in Swagger UI at `http://localhost:8000/docs` to test endpoints interactively.

---  

## Deployment  

### Docker Compose (self‑host)  

```yaml
# docker-compose.yml (excerpt)
services:
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: bookmark
    volumes:
      - pgdata:/var/lib/postgresql/data

  backend:
    build: ./backend
    env_file: ./backend/.env
    depends_on: [db]

  frontend:
    build: ./frontend
    env_file: ./frontend/.env
    ports: ["3000:3000"]
    depends_on: [backend]

volumes:
  pgdata:
```

Run `docker compose up -d` and the stack will be production‑ready (use a reverse proxy like Traefik or Caddy for TLS termination).

### Vercel (frontend only)  

1. Connect the GitHub repo to Vercel.  
2. Set the following environment variables in Vercel dashboard:  

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_API_URL` | `https://api.yourdomain.com/api/v1` |
| `NEXT_PUBLIC_APP_NAME` | `Bookmark‑Organizer` |

Deploys automatically on push to `main`.

### Backend on Render / Railway / Fly.io  

- Build command: `pip install -r requirements.txt && uvicorn app.main:app --host 0.0.0.0 --port $PORT`  
- Set the same env vars as in the Docker example.

---  

## API Documentation  

The backend automatically generates OpenAPI documentation.

- **Swagger UI**: `GET /docs`  
- **ReDoc**: `GET /redoc`  

### Selected Endpoints  

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| `POST` | `/api/v1/auth/register` | Register a new user | ❌ |
| `POST` | `/api/v1/auth/login` | Return JWT access/refresh tokens | ❌ |
| `GET`  | `/api/v1/bookmarks` | List current user’s bookmarks (supports `?search=` query) | ✅ |
| `POST` | `/api/v1/bookmarks` | Create a bookmark | ✅ |
| `GET`  | `/api/v1/bookmarks/{id}` | Retrieve a single bookmark | ✅ |
| `PATCH`| `/api/v1/bookmarks/{id}` | Update fields | ✅ |
| `DELETE`| `/api/v1/bookmarks/{id}`| Delete bookmark | ✅ |
| `GET`  | `/api/v1/collections` | List collections | ✅ |
| `POST` | `/api/v1/collections` | Create a collection | ✅ |
| `POST` | `/api/v1/bookmarks/{id}/tags` | Add tags to a bookmark | ✅ |

**Authentication** – Bearer token (`Authorization: Bearer <jwt>`). Tokens expire after 1 hour; refresh with `/auth/refresh`.

**Error format**

```json
{
  "detail": "Error message",
  "code": "validation_error"
}
```

---  

## Contributing  

We welcome contributions! Please follow these steps:

1. **Fork** the repository and clone your fork.  
2. **Create a branch** for your feature or bug‑fix: `git checkout -b feat/awesome-feature`.  
3. **Write tests** (backend: `pytest`, frontend: `pnpm test`).  
4. **Run linters** (`black`, `flake8`, `eslint`).  
5. **Commit** using conventional commits (e.g., `feat: add dark mode toggle`).  
6. **Open a Pull Request** against `main`.  
7. PR must pass CI checks (lint, type‑check, tests).  

### Development workflow  

- Backend: `uvicorn app.main:app --reload`  
- Frontend: `pnpm dev` (hot reload)  
- Shared utilities are located in `frontend/lib/utils.ts`.  

### Code of Conduct  

Please read our [CODE_OF_CONDUCT.md](https://github.com/sahilmishra03/bookmark-organizer/blob/main/CODE_OF_CONDUCT.md).

---  

## Troubleshooting  

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| **Cannot connect to backend** (404 on `/api/v1/...`) | Frontend `NEXT_PUBLIC_API_URL` not set or mismatched port. | Verify `.env` values; restart containers. |
| **Database migrations fail** | Missing `DATABASE_URL` or wrong credentials. | Ensure PostgreSQL container is running; check env var. |
| **CORS errors** | `ALLOWED_ORIGINS` does not include frontend URL. | Add `http://localhost:3000` (or production URL) to the list. |
| **JWT “signature verification failed”** | Changed `JWT_SECRET_KEY` after tokens were issued. | Re‑login to obtain fresh token. |
| **Static assets not loading** | `next.config.ts` missing remote patterns for external images. | Add the hostname to `images.remotePatterns`. |

For more help, open an issue or join the discussion in **Discussions** tab.

---  

## Roadmap  

- **v1.1** – Browser extension for one‑click saving.  
- **v1.2** – Collaborative collections (shared read‑only links).  
- **v2.0** – Full‑text search powered by **Meilisearch** for faster indexing.  
- **Mobile app** – React Native wrapper.  

Feel free to suggest features via GitHub Issues!

---  

## License & Credits  

**License**: MIT © 2024‑2026 [Sahil Mishra](https://github.com/sahilmishra03) – see `LICENSE` file.  

### Acknowledgments  

- **FastAPI** – for the async API framework.  
- **Next.js** – for the modern React rendering pipeline.  
- **shadcn/ui** – UI component library.  
- **Tailwind Labs** – utility‑first CSS.  
- **OpenAI** – inspiration for the project name.  

### Contributors  

<a href="https://github.com/sahilmishra03/bookmark-organizer/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=sahilmishra03/bookmark-organizer" alt="contributors"/>
</a>

---  

*Happy bookmarking!* 🎉  