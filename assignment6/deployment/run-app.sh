#!/bin/bash
set -e

sudo mkdir -p /opt/chatbot
sudo cp -r . /opt/chatbot/

if [ ! -f /opt/chatbot/.env ]; then
  echo "ERROR: Create /opt/chatbot/.env with your GEMINI_API_KEY before running this script."
  echo "Example: echo 'GEMINI_API_KEY=your_key_here' > /opt/chatbot/.env"
  exit 1
fi

cd /opt/chatbot
sudo docker build -t college-chatbot .

sudo docker run -d \
  --name chatbot \
  --restart unless-stopped \
  --env-file .env \
  -p 8000:8000 \
  college-chatbot

echo ""
echo "=== Setup Complete ==="
echo "Your chatbot is running on port 8000 inside a Docker container."
echo ""
echo "IMPORTANT: Make sure you have a GCE firewall rule allowing TCP:8000"
echo "  gcloud compute firewall-rules create allow-8000 --allow tcp:8000 --direction INGRESS"
echo ""
echo "Access the chatbot at: http://<YOUR_VM_EXTERNAL_IP>:8000"
echo ""
echo "Useful commands:"
echo "  View logs:   sudo docker logs -f chatbot"
echo "  Stop:        sudo docker stop chatbot"
echo "  Restart:     sudo docker restart chatbot"
echo "  Rebuild:     sudo docker build -t college-chatbot /opt/chatbot && sudo docker rm -f chatbot && sudo docker run -d --name chatbot --restart unless-stopped --env-file .env -p 8000:8000 college-chatbot"
