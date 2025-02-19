# Docker image configuration
IMAGE_NAME = bimarz-website
REGISTRY = registry-b9200d2040-azta.apps.ir-central1.arvancaas.ir
REMOTE_HOST = azta-arvan
REMOTE_DIR = bimarz
REGISTRY_USERNAME = aliirani

# Load environment variables from .env.prod
include .env.prod
export ARVAN_DOCKER_PASSWORD

.PHONY: build tag push deploy production login

login:
	docker login ${REGISTRY} --username ${REGISTRY_USERNAME} --password ${ARVAN_DOCKER_PASSWORD}

# Build the Docker image
build:
	docker buildx build \
		--platform linux/amd64 \
		--build-arg DATABASE_URL=${DATABASE_URL} \
		--build-arg SECRET_KEY=${SECRET_KEY} \
		--build-arg NEXT_PUBLIC_SERVER_URL=${NEXT_PUBLIC_SERVER_URL} \
		-t ${IMAGE_NAME} .

# Tag the Docker image
tag: build
	docker tag ${IMAGE_NAME} ${REGISTRY}/${IMAGE_NAME}:latest

# Push the Docker image to registry
push: tag
	docker push ${REGISTRY}/${IMAGE_NAME}:latest

# Deploy to production
deploy:
	ssh ${REMOTE_HOST} "cd ${REMOTE_DIR} && docker compose pull && docker compose up -d"

# Full production deployment pipeline
production: build tag push deploy
	@echo "Production deployment completed successfully!"
