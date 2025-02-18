## Build Docker Image

```bash
export $(cat .env.prod | xargs) && docker buildx build \
  --platform linux/amd64 \
  --build-arg DATABASE_URL=$DATABASE_URL \
  --build-arg SECRET_KEY=$SECRET_KEY \
  --build-arg NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL \
  -t bimarz-website .
```

## Push Docker Image to ArvanCloud

```bash
docker login registry-b9200d2040-azta.apps.ir-central1.arvancaas.ir
docker tag bimarz-website registry-b9200d2040-azta.apps.ir-central1.arvancaas.ir/bimarz-website:latest && \
docker push registry-b9200d2040-azta.apps.ir-central1.arvancaas.ir/bimarz-website:latest
```
