# Intro Cloud Computing - Proj 3 - Docker



## Project description

> [proj source](https://uc.instructure.com/courses/1830328/assignments/23369460)

- Install Docker Desktop on your personal computer (Windows, macOS, or Linux). (1 Point)
    - Submit a screenshot of Docker Desktop showing your containers running on your personal machine.
- Build a Dockerfile using a lightweight base image (e.g., ubuntu, alpine, python:3.9-slim). (1 Point)
    - Upload the completed Dockerfile as a text file, or share the code in GitHub.
- Develop a Python script (or use another language of your choice) to perform the following tasks:  (1 Point)
    - Read two text files: `IF.txt` and `AlwaysRememberUsThisWay.txt` located at /home/data inside the container, and perform the objectives listed in Step 4.
    - Upload the completed script (e.g., scripts.py) as a text file, or share the code in GitHub.
- The Python script must achieve the following objectives. Grading will be done by executing the tar file named with your email username (e.g., KANSKRI.tar) in Step 6:
    - a. Count the total number of words in each text file located at /home/data.  (1 Point)
    - b. Calculate the grand total of words across both files. (1 Point)
    - c. Identify the top 3 most frequent words and their respective counts in `IF.txt` (1 Point)
    - d. Handle contractions (Examples: I'm, can't, don't) by splitting them into individual words, then find the top 3 most frequent words and their respective counts in `AlwaysRememberUsThisWay.txt` (1 Point)
    - e. Determine the IP address of the machine running the container. (1 Point)
    - f. Write the results to a text file at /home/data/output/result.txt. When the container is executed, it should print the contents of result.txt to the console before exiting. (1 Point)
- Optimize your Docker image to ensure that its size is as small as possible (target size: less than 200MB). (1 Point)
- Create and submit a tar file of your final image for evaluation: (1 Point)
    - a. Compress the image into a tar file named with your email username (e.g., KANSKRI.tar).
    - b. Upload the tar file to the course platform (e.g., Canvas) for grading.

## Key points
- Your Dockerfile should use a lightweight base image to ensure the smallest possible final image.
- The script should handle edge cases like contractions and be flexible enough to run without manual intervention.
- Your container must be fully automated: it should execute, generate output, and terminate without user interaction.
- Ensure all outputs (word counts, IP address, etc.) are written to result.txt and printed to the console when the container runs.
- Test your Docker container before submission to ensure it runs and exits properly on any machine.
- Make sure the output path and volumes are correctly set when running the container.
- If you use another language (Example Java), the same steps apply with equivalent commands and syntax.

##  Extra credits
Orchestrate Your Container Deployment Using Kubernetes or Docker Swarm:
- Set up basic orchestration to deploy and manage at least two replicas of your container. You may use either Kubernetes or Docker Swarm (via Docker Desktop).
- Submit your Kubernetes manifest (YAML file) or Docker Swarm configuration for evaluation. (0.5 Point)
- When orchestrating the container, ensure it can scale with multiple replicas and monitor their status using either Kubernetes or Docker Swarm. Submit the output from the command kubectl get pods > kube_output.txt; cat kube_output.txt. (0.5 Point)
