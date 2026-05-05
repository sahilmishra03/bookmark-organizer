<p align="center">
  <img src="./frontend/public/main-logo.png" alt="Bookmark Organizer Logo" width="80"/>
</p>

# Bookmark Organizer

A modern bookmark manager focused on speed, clarity, and organization.

Organize, search, and access your links --- all in one place.
:::

------------------------------------------------------------------------

## Features

-   Folder-based organization\
-   Tag system for flexible grouping\
-   Fast and responsive search\
-   Favorites for quick access\
-   Import bookmarks from browser (HTML)\
-   Export bookmarks in Chrome-compatible format

------------------------------------------------------------------------

## Roadmap

-   Browser extension for instant saving\
-   Mobile app (Android & iOS)\
-   Advanced search and filtering

------------------------------------------------------------------------

## Tech Stack

-   **Frontend:** Next.js, Tailwind CSS\
-   **Backend:** FastAPI\
-   **Database:** PostgreSQL\
-   **Authentication:** Google OAuth + JWT

------------------------------------------------------------------------

## Setup

### Prerequisites

-   Node.js 18+\
-   Python 3.13+\
-   PostgreSQL

------------------------------------------------------------------------

### Installation

``` bash
git clone https://github.com/sahilmishra03/Ghostmark.git
cd bookmark-organizer
```

#### Frontend

``` bash
cd frontend
npm install
```

#### Backend

``` bash
cd backend
uv sync
```

#### Environment Variables

Copy `.env.example` → `.env` and configure:

``` env
DATABASE_URL=
SECRET_KEY=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

------------------------------------------------------------------------

### Running the Application

#### Backend

``` bash
cd backend
python -m uvicorn main:app --reload
```

#### Frontend

``` bash
cd frontend
npm run dev
```

------------------------------------------------------------------------

### Access

-   Frontend → http://localhost:3000\
-   Backend → http://localhost:8000\
-   API Docs → http://localhost:8000/docs

------------------------------------------------------------------------

## Project Structure

    bookmark-organizer/
    ├── frontend/
    ├── backend/
    └── README.md

------------------------------------------------------------------------

## Development

``` bash
git add .
git commit -m "feat: add feature"
git push origin main
```

------------------------------------------------------------------------

## Contributing

1.  Fork the repository\
2.  Create a branch\
3.  Commit changes\
4.  Open a Pull Request

------------------------------------------------------------------------

## License

MIT License
