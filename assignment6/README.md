# Intro Cloud Computing Project 6

## Abstract

The objective of this project is to develop a college inquiry chatbot designed to respond to common queries posed by students, such as inquiries related to college details, course offerings, location, fee structure, and more.

You are encouraged to utilize any available features and tools within Google Cloud Platform (GCP) to develop the chatbot.

The following are examples of GCP components that may be employed (although alternatives may also be used):
- IaaS (Infrastructure as a Service): Google Compute Engine.
- PaaS (Platform as a Service): Google App Engine.
- SaaS (Software as a Service): Google Dialogflow.


## Requirements:

1. Interactive Cloud-Based Chatbot System. (Points: 1)
Develop an interactive chatbot system where the user is prompted to enter the following information:
- User First Name
- User Last Name
- User Email Address

2. Student Inquiry List. (Points: 1)
Provide a list of four distinct questions that a student might ask, such as:
- "Does the college have a football team?"
- "Does it offer a Computer Science major?"
- "What is the in-state tuition?"
- "Does it provide on-campus housing?"

3. Response to Student Queries:  (Points: 1)
Provide detailed answers to the four queries listed in Question 2, as they are requested.

4. Chatbot Conclusion. (Points: 1)
Conclude the chatbot interaction with the following details:
- Display the User's First Name, Last Name, and Email Address provided in Question 1.
- Display the Chatbot Creator's First Name, Last Name, and School Email Address.

5. Submission URL: (Points: 1)
Provide the URL for TAs and instructors to log in, and enter the information, and ask the listed questions.

## Guidance:
- Extensive resources for GCP-based web app and chatbot development are available.
- For IaaS, refer to the code from Project #1 (Running a Flask app on AWS EC2) and adapt it for deployment on Google Compute Engine Links to an external site..
- For SaaS, explore Dialogflow from Google Cloud. Google Cloud offers $300 in free credits for its usage.
- For PaaS, review the process of writing a basic web service for Google App Engine Links to an external site..

> Submission: Kindly submit the GCP URL for review.

---

## Project Guide

### Architecture

| Layer | Technology |
|-------|------------|
| Backend | Python 3.13 + FastAPI |
| Frontend | Jinja2 templates + vanilla HTML/CSS/JS |
| AI | Google Gemini API (`google-genai` SDK) |
| Knowledge | JSON file (`knowledge.json`) injected into system prompt |
| Deployment | Docker on Google Compute Engine |

### Chat Flow

1. **Welcome** — User enters first name, last name, email
2. **Chat** — 4 clickable question buttons + free-form text input; Gemini answers using the knowledge base
3. **Conclusion** — Displays user info and creator info

### Project Structure

```
assignment6/
├── app.py                 # FastAPI routes + Jinja2 templates
├── chat.py                # Gemini API integration (ChatSession class)
├── config.py              # App settings, knowledge base loader, system prompt
├── knowledge.json         # University data (football, majors, tuition, housing, etc.)
├── .env                   # GEMINI_API_KEY (never committed)
├── templates/
│   └── index.html         # Single-page chat UI
├── static/
│   ├── style.css          # Black/white/red theme
│   └── script.js          # Frontend chat logic
├── deployment/
│   └── setup-gce.sh       # Docker setup script for GCE VM
├── Dockerfile              # Docker image definition
├── .dockerignore
├── pyproject.toml          # uv-managed dependencies
└── AGENTS.md               # Dev conventions & tooling
```

### Local Development

```bash
# Install dependencies
uv sync

# Create .env file
echo 'GEMINI_API_KEY=your_key_here' > .env

# Run dev server
uv run uvicorn app:app --reload --port 8000
```

Open [http://localhost:8000](http://localhost:8000).

### Customizing the Knowledge Base

Edit `knowledge.json` for updated university's data. The contents are automatically loaded into the Gemini system prompt, so the chatbot will ground its answers in that data.

Update creator info in `config.py`:
```python
CREATOR_FIRST_NAME = "Your"
CREATOR_LAST_NAME = "Name"
CREATOR_EMAIL = "your.email@university.edu"
```

### Deploying to Google Compute Engine

1. Create an Ubuntu 24.04 LTS VM on GCE (e2-micro)
2. Add a firewall rule allowing TCP port 8000:
   ```bash
   gcloud compute firewall-rules create allow-8000 --allow tcp:8000 --direction INGRESS
   ```
3. SSH into the VM and clone/copy the project
4. Create the `.env` file:
   ```bash
   echo 'GEMINI_API_KEY=your_key_here' > .env
   ```
5. Run the setup script:
   ```bash
   bash deployment/setup-gce.sh
   ```
6. Access the chatbot at `http://<VM_EXTERNAL_IP>:8000`

### Docker Commands (on GCE)

```bash
sudo docker logs -f chatbot       # view logs
sudo docker restart chatbot       # restart
sudo docker stop chatbot          # stop
```

To rebuild after code changes:
```bash
sudo docker build -t college-chatbot /opt/chatbot
sudo docker rm -f chatbot
sudo docker run -d --name chatbot --restart unless-stopped --env-file .env -p 8000:8000 college-chatbot
```
