#!/usr/bin/env bash

# Exit if any command fails
set -e

GIT_REPO_DIR=$(git rev-parse --show-toplevel)
OPENAPI_FILE=${GIT_REPO_DIR}/openapi.yaml
SERVER_DIR=${GIT_REPO_DIR}/server
PACKAGE_NAME=ulmapi
PACKAGE_DIR=${SERVER_DIR}/${PACKAGE_NAME}

echo "[¯\_(ツ)_/¯] The current script is $0"
echo "[¯\_(ツ)_/¯] The current Git repository is ${GIT_REPO_DIR}"
echo "[¯\_(ツ)_/¯] The OpenAPI specification that will be used is ${OPENAPI_FILE}"
echo "[¯\_(ツ)_/¯] The server code will be generated in $SERVER_DIR"
echo "[¯\_(ツ)_/¯] The base Python package will be ${PACKAGE_NAME} in directory ${PACKAGE_DIR}"
echo ""

# Validate openapi.yaml
${GIT_REPO_DIR}/tools/openapi-generator-cli.sh validate \
    --input-spec ${OPENAPI_FILE}

# Save the current controller implementations so they aren't overwritten
mkdir -p ${PACKAGE_DIR}/controllers/impl
mv ${PACKAGE_DIR}/controllers/impl ${PACKAGE_DIR}/controllers/_impl

# Generate server code based on openapi.yaml
${GIT_REPO_DIR}/tools/openapi-generator-cli.sh generate \
    --generator-name python-flask \
    --input-spec ${OPENAPI_FILE} \
    --model-package dto \
    --output ${SERVER_DIR} \
    --additional-properties packageName=${PACKAGE_NAME},controllerPackage=controllers.impl

# Put the generated controllers into api/ and restore the existing controller 
# implementations in impl/
rm -rf ${PACKAGE_DIR}/controllers/api
mv ${PACKAGE_DIR}/controllers/impl ${PACKAGE_DIR}/controllers/api
mv ${PACKAGE_DIR}/controllers/_impl ${PACKAGE_DIR}/controllers/impl
