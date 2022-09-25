#!/usr/bin/env bash

# Exit on failure
set -e

TMP_DIR=/tmp/backup-db

echo ">> Cleaning working directory"
if [[ -e "$TMP_DIR" ]]; then rm -rf "$TMP_DIR"; fi
mkdir -p "$TMP_DIR"
cd "$TMP_DIR"

if [[ $1 = "--install-mongo-tool" ]]
then
  echo ">> Downloading mongodb tools"
  export MONGO_TOOL_VERSION="mongodb-database-tools-ubuntu2004-x86_64-100.3.1"
  wget --quiet "https://fastdl.mongodb.org/tools/db/${MONGO_TOOL_VERSION}.tgz"

  echo ">> Extracting mongodb tools"
  tar -zxvf ${MONGO_TOOL_VERSION}.tgz
  rm -f ${MONGO_TOOL_VERSION}.tgz
  export PATH="./${MONGO_TOOL_VERSION}/bin":${PATH}
fi

echo ">> Start dumping data"
mkdir dump
echo mongodump --uri="${DB_URL}" --out=dump
mongodump --uri="${DB_URL}" --out=dump

if [[ $1 = "--install-mongo-tool" ]]; then rm -rf "./${MONGO_TOOL_VERSION}"; fi

echo ">> Compressing data"
TODAY=$(date +'%Y-%m-%d')
echo tar -czvf "${TODAY}.tar.gz" dump
tar -czvf "${TODAY}.tar.gz" dump
rm -rf dump

# cd to backend directory
echo ">> Uploading data"
cd -
cd "$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
node upload_backup "${TMP_DIR}/${TODAY}.tar.gz"
