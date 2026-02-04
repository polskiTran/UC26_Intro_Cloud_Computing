# Backend for a simple user store webapp on EC2 with (fastapi) + (sqlite3, sqlalchemy)

## Structure
```shell
user-info-app/
├── app/                        # Main application source code
│   ├── __init__.py
│   ├── main.py                 # App entry point (FastAPI instance)
│   ├── models.py               # Database models (SQLAlchemy)
│   ├── schemas.py              # Pydantic models (Data validation)
│   ├── crud.py                 # Database logic (Create, Read, Update, Delete)
│   ├── database.py             # DB connection & Session management
│   └── routers/                
│       ├── __init__.py
│       └── users.py            # Users router
├── tests/                      # Test suite
│   └── Limerick.txt            # Test .txt file
├── data/                       # Directory to store the SQLite file
│   └── .gitkeep                # Ensures folder is tracked by git
├── .env                        # Environment variables (DB URL, Secrets)
├── .gitignore                  # Files to ignore (venv, db, pyc)
├── pyproject.toml              # Project metadata & dependencies (Managed by uv)
├── uv.lock                     # Exact dependency versions (Managed by uv)
└── README.md
```

## Usage
> Make sure [uv](https://docs.astral.sh/uv/) is installed

Install the dependencies
```shell
uv sync
```

Add `.env` file for DB connection string
```
sqlite:///./data/[___].db
```


Run the app
```shell
uv run uvicorn app.main:app --reload
```

From the localhost link, append `/docs` to get swagger UI

Useful command
```shell
# check DB
cd assignment2/backend/data && sqlite3 users.db "SELECT * FROM users;"
```
