# 1. use alpine python image for lightweight
FROM python:3.14-alpine

# 2. create working dir and output dir
RUN mkdir -p /home/data/output /app

# 3. set working dir
WORKDIR /app

# 4. copy script to working dir
COPY script.py .

# 5. copy the data directory to the container data directory
COPY data/ /home/data/

# 6. run the script
CMD ["python", "script.py"]
