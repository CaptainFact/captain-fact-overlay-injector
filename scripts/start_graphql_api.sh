#!/usr/bin/env bash

cd -- "$(dirname $0)"

echo "Starting containers"
docker-compose up -d

echo "Waiting for API to be ready..."

CONTAINER_ID=$(docker ps | grep captainfact/graphql-api:dev | awk '{print $1}')

while [ -z ${CONTAINER_ID} ]
do
  echo "Waiting for API to be ready..."
  sleep 2
  CONTAINER_ID=$(docker ps | grep captainfact/graphql-api:dev | awk '{print $1}')
done

echo "Running migrations"
docker exec -it ${CONTAINER_ID} /opt/app/bin/captain_fact_graphql migrate

echo "Starting Elixir console. Enjoy !"
docker exec -it ${CONTAINER_ID} /opt/app/bin/captain_fact_graphql remote_console