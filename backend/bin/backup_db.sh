#!/usr/bin/env sh

# Exit on failure
set -e
TODAY=$(date +'%Y-%m-%d')

# cd to backend directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "${DIR}"

echo "Downloading mongodb tools"
export MONGO_TOOL_VERSION="mongodb-database-tools-ubuntu2004-x86_64-100.3.1"
wget "https://fastdl.mongodb.org/tools/db/${MONGO_TOOL_VERSION}.tgz"

echo "Extracting mongodb tools"
tar -zxvf ${MONGO_TOOL_VERSION}.tgz
export PATH="./${MONGO_TOOL_VERSION}/bin":${PATH}

echo "Installing googleapis package"
yarn add googleapis@39

echo "Start dumping data"
mkdir dump
echo mongodump --uri="${DB_URL}" --out=dump
mongodump --uri="${DB_URL}" --out=dump

echo "Compressing data"
echo tar -czvf "${TODAY}.tar.gz" dump
tar -czvf "${TODAY}.tar.gz" dump

echo "Uploading data"
node upload_backup "${TODAY}.tar.gz"
