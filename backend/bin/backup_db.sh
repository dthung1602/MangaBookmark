#!/usr/bin/env sh

# Exit on failure
set -e

# cd to backend directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "${DIR}"

if [[ $1 != "--local" ]]
then
  # Only update once a week
  WEEK_DAY=$(date +"%a")
  if [ ! "$WEEK_DAY" = "Sun" ] ; then
    exit 0
  fi

  echo ">> Downloading mongodb tools"
  export MONGO_TOOL_VERSION="mongodb-database-tools-ubuntu2004-x86_64-100.3.1"
  wget --quiet "https://fastdl.mongodb.org/tools/db/${MONGO_TOOL_VERSION}.tgz"

  echo ">> Extracting mongodb tools"
  tar -zxvf ${MONGO_TOOL_VERSION}.tgz
  export PATH="./${MONGO_TOOL_VERSION}/bin":${PATH}

  echo ">> Installing googleapis package"
  yarn --cwd "${DIR}/.." add googleapis@39
fi

echo ">> Start dumping data"
if [[ -d dump ]]; then rm -rf dump; fi
mkdir dump
echo mongodump --uri="${DB_URL}" --out=dump
mongodump --uri="${DB_URL}" --out=dump

echo ">> Compressing data"
TODAY=$(date +'%Y-%m-%d')
echo tar -czvf "${TODAY}.tar.gz" dump
tar -czvf "${TODAY}.tar.gz" dump

echo ">> Uploading data"
node upload_backup "${TODAY}.tar.gz"
