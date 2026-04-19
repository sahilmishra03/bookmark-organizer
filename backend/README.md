# Bookmark Organizer Backend

A FastAPI backend service for the Bookmark Organizer application.

## Features

- RESTful API built with FastAPI
- Modern Python development with uv package manager
- Automatic API documentation with Swagger/OpenAPI
- Hot reload during development

## Prerequisites

- Python 3.13 or higher
- uv (Python package manager) - Install from https://docs.astral.sh/uv/

## New User Setup

1. Clone the repository:

```bash
git clone https://github.com/sahilmishra03/bookmark-organizer
```

2. Change into the backend folder:

```bash
cd bookmark-organizer/backend
```

3. Install dependencies with uv:

```bash
uv sync
```

4. Activate the virtual environment:

```bash
# macOS / Linux
source .venv/bin/activate

# Windows
.venv\Scripts\activate
```

5. Verify the installation:

```bash
python --version
uv --version
```

> On macOS, if `python` points to Python 2, use `python3 --version` and `python3 -m pip install -r requirements.txt` instead.

## Installation (Alternative)

If you prefer pip, install dependencies directly:

```bash
pip install -r requirements.txt
```

## Run the API Locally

Start the development server from the `backend` directory:

```bash

# To start the server
python -m fastapi dev main.py
```

> Note: The FastAPI app is defined in `app/main.py`; `backend/main.py` re-exports `app` so this command works from the project root.
>
> On some Windows setups, `uv run fastapi dev` may fail with a trampoline/canonicalization error. Use the `python -m fastapi` form instead.

Open the backend in your browser at:

- http://localhost:8000
- API docs: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Local Development Workflow

1. Start the server.
2. Open `http://localhost:8000` to verify the health check.
3. Use `http://localhost:8000/docs` to explore available endpoints.
4. Make code changes and keep the dev server running for hot reload.

## Running Tests

```bash
# Using uv
uv run pytest

# Or directly
pytest
```

## Project Structure

- `main.py` - Main FastAPI application entry point
- `pyproject.toml` - Project configuration and dependencies for uv
- `requirements.txt` - Dependencies list for pip
- `README.md` - This file

## Adding Dependencies

```bash
# Using uv
uv add <package-name>

# Using pip
pip install <package-name>
# Then update requirements.txt
pip freeze > requirements.txt
```

## API Endpoints

- `GET /` - Health check endpoint

## Learn More

- [FastAPI Documentation](https://fastapi.tiangolo.com)
- [uv Documentation](https://docs.astral.sh/uv/)
