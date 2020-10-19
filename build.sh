# exit on any failure
set -e

# cd to code root directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "${DIR}"

# generate Swagger doc
yarn --cwd "${DIR}/backend" run gendoc

# build FE
yarn --cwd "${DIR}/frontend" run build

# pre-compress static files
echo "Compressing static files ..."
gzip -9 -r -k "${DIR}/frontend/build"
echo "Done compressing"

if [ "${NODE_ENV}" = "production" ]
then
  # move build to backend
  mv "${DIR}/frontend/build" "${DIR}/backend/frontend-build"
else
  # create soft link if it does not exist yet
  if [ ! -L "${DIR}/backend/frontend-build" ]
  then
    ln -s "${DIR}/frontend/build" "${DIR}/backend/frontend-build"
  fi
fi