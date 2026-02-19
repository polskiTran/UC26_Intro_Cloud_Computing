# Cloud Computing Assignment 2 - WebApp on EC2

## Problem Statement
[Problem Statement](https://uc.instructure.com/courses/1830328/assignments/23344360) Breakdown: Webapp to store users info    
- Login/Sign up page
    - Username
    - Password
    - First name
    - Last name
    - Email
    - Address
- Display page where we show the info of the user
    - Upload `.txt` file option. 
        - If exist in db linked to user: Download button + display word count 
    - Logout element
    - Note for self: Add interactive element. 

## Backend stack
FastAPI + SQLite3

## Frontend stack
Astro + Shadcn UI

## EC2 instance connect notes
### Setup
> [uv](https://docs.astral.sh/uv/) python package manager
> 
> node + npm for webapp
> nginx for reverse proxy
> 
> sqlite3 db engine
> 
> tmux for persistence 
```bash
# pkg update
sudo apt update && sudo apt upgrade -y

# uv
curl -LsSf https://astral.sh/uv/install.sh | sh

# node + npm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install --lts

# sqlite3 + nginx
sudo apt install sqlite3 nginx

# check python3 + tmux
python3 --version
tmux --version

# clone the webapp repo
cd
git clone https://github.com/polskiTran/IntroCC-Proj2-UserStoreWebapp.git
```

### Running the webapp
```bash
# Setup nginx reverse proxy
sudo vim /etc/nginx/sites-enabled/fastapi_nginx
```
Code for nginx:
```bash
server {
    listen 80;
    server_name [your_web_page_ip_address + dns];

    # 1. Route API requests to FastAPI
    location /api/ {
        proxy_pass http://127.0.0.1:8000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # 2. Route everything else to Astro
    location / {
        proxy_pass http://127.0.0.1:4321;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```
Increase server_names_hash_bucket_size to 128 for the long ec2 dns 
```bash
sudo vim /etc/nginx/nginx.conf
```

Reload Nginx
```bash
# Reload nginx config
sudo systemctl daemon-reload
```

#### Opt 1: Runinng the app manually
```bash
# Backend
cd backend/
tmux new -s backend
uv run uvicorn app.main:app --reload

# Frontend
cd frontend/
tmux new -s frontend
## Dev
npm run dev

## Prod
npm run build
npm run preview
```

#### Opt 2: Using the `bash` script
```bash
# make script executable
chmod +x run_app.sh 

# execute 
./run_app.sh
```

> Tmux note
> 
> `ctrl b + d` to detach from a session
>
> `tmux list-sessions` to list the current sessions
> 
> `tmux attach -t [session-name]` to attach to a session
