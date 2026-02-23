# Intro Cloud Computing - Proj 3 - Docker

## Project description

> [proj source](https://uc.instructure.com/courses/1830328/assignments/23369460)

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

## Guides

- build the docker image
```bash
docker build -t introcc-proj3-docker .
```

- test run the docker image
```bash
docker run --rm introcc-proj3-docker
```

- save image to `.tar`
```bash
docker save -o tran2tp.tar introcc-proj3-docker
```
