# Bookmark Organizer Backend

A FastAPI-based backend service for the Bookmark Organizer application.

## Features

- RESTful API built with FastAPI
- Modern Python development with uv package manager
- Automatic API documentation with Swagger/OpenAPI
- Hot reload during development

## Prerequisites

- Python 3.13 or higher
- uv (Python package manager) - Install from https://docs.astral.sh/uv/

## Installation

### Using uv (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd bookmark-organizer-be

# Install dependencies
uv sync

# Activate virtual environment
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```

### Using pip (Alternative)

```bash
# Install dependencies
pip install -r requirements.txt
```

## Quick Start

### Development Server

```bash
# Using uv
uv run fastapi dev

# Or using pip
fastapi dev main.py
```

The server will start at http://localhost:8000

### Production Deployment

**Live Application**: https://bookmark-organizer-be-b0d62e24.fastapicloud.dev

### API Documentation

- **Development**: http://localhost:8000/docs
- **Production**: https://bookmark-organizer-be-b0d62e24.fastapicloud.dev/docs
- **ReDoc**: http://localhost:8000/redoc

## Project Structure

- `main.py` - Main FastAPI application entry point
- `pyproject.toml` - Project configuration and dependencies (uv)
- `requirements.txt` - Dependencies list (pip)
- `README.md` - This file

## Development

### Adding Dependencies

```bash
# Using uv
uv add <package-name>

# Using pip
pip install <package-name>
# Then update requirements.txt
pip freeze > requirements.txt
```

### Running Tests

```bash
# Using uv
uv run pytest

# Using pip
pytest
```

## Deployment

### FastAPI Cloud (Private Beta)

```bash
uv run fastapi deploy
```

### Docker

```bash
# Build image
docker build -t bookmark-organizer-be .

# Run container
docker run -p 8000:8000 bookmark-organizer-be
```

## API Endpoints

- `GET /` - Health check endpoint

## Learn More

- [FastAPI Documentation](https://fastapi.tiangolo.com)
- [uv Documentation](https://docs.astral.sh/uv/)
- [FastAPI Cloud](https://fastapicloud.com)
