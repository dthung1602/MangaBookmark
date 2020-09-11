# exit on any failure
set -e

# cd to code root directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "${DIR}"

# generate Swagger doc
yarn --cwd "${DIR}/backend" run gendoc

# build FE
yarn --cwd "${DIR}/frontend" run build

if [ "${NODE_ENV}" = "production" ]
then
  # move build to backend
  mv "${DIR}/frontend/build" "${DIR}/backend/frontend-build"
  # delete frontend directory
  rm -rf "${DIR}/frontend"
else
  # create soft link
  ln -s "${DIR}/frontend/build" "${DIR}/backend/frontend-build"
fi