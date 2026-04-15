# AGENTS.md

## Project Overview

College inquiry chatbot using FastAPI, Jinja2 templates, and the Gemini API. Deploys on Google Compute Engine.

## Commands

### Run the dev server

```bash
uv run uvicorn app:app --reload --port 8000
```

### Install dependencies

```bash
uv sync
```

### Add a dependency

```bash
uv add <package>
```

### Add a dev dependency

```bash
uv add --dev <package>
```

## Linting & Formatting

### Lint

```bash
uv run ruff check .
```

### Format (check only)

```bash
uv run ruff format --check .
```

### Format (write)

```bash
uv run ruff format .
```

### Fix lint issues automatically

```bash
uv run ruff check --fix .
```

## Type Checking

Uses [ty](https://github.com/astral-sh/ty) by Astral (not mypy).

```bash
uv run ty check .
```

## Conventions

### Python

- Python 3.13+
- Use `uv` for all package management (never pip)
- Always add type hints to function signatures
- Use `async` FastAPI handlers
- Use Pydantic models for request/response bodies
- Use f-strings for string formatting
- Use `from` imports for specific symbols (not wildcard imports)
- Keep route handlers in `app.py`, Gemini logic in `chat.py`, configuration in `config.py`

### FastAPI

- Use `Jinja2Templates` for HTML rendering
- Use `StaticFiles` for CSS/JS assets
- Define Pydantic `BaseModel` classes for all request bodies
- Return dicts from endpoints (FastAPI auto-serializes to JSON)
- Use API prefix `/api/` for JSON endpoints

### Frontend

- Vanilla HTML/CSS/JS (no frameworks)
- Theme: black/white with red accent (`#C62828`)
- Professional, flat design (no gradients, no AI slop)
- `script.js` uses TypeScript-style JSDoc types in comments where helpful

### Environment

- `GEMINI_API_KEY` stored in `.env` (never committed to git)
- `config.py` reads `.env` via `python-dotenv`
- Single-server deployment (in-memory sessions, no database)