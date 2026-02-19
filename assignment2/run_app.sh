#!/usr/bin/env bash
# chmod +x run_app.sh to make the script executable

# Create two detached sessions with an idle shell
tmux new-session -d -s frontend
tmux new-session -d -s backend

# Send commands to first session to run the frontend
tmux send-keys -t frontend "cd frontend/" C-m
tmux send-keys -t frontend "npm install" C-m
tmux send-keys -t frontend "npm run build" C-m
tmux send-keys -t frontend "node dist/server/entry.mjs" C-m

# Send commands to second session to run the backend
tmux send-keys -t backend "cd backend/" C-m
tmux send-keys -t backend "uv run uvicorn app.main:app --reload" C-m

# list current sessions
tmux list-sessions
