#!/bin/bash

echo Building and starting back-end containers
echo See file 'docker-compose-build-and-run-from-local.yml' for more details
echo To stop all containers, just stop the script with Ctrl+C
echo --------------------------------------------

echo ----- Clean up any existing containers -----
docker-compose -f docker-compose-build-and-run-local.yml down

echo -------- Build and start containers --------
docker-compose -f docker-compose-build-and-run-local.yml up
