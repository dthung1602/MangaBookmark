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

cd "${DIR}/frontend/build"
shopt -s extglob
gzip -9 -k !(static|sites-logo|*.png|*.jpg|*.jpeg|*.txt)
gzip -9 -r -k "${DIR}/frontend/build/static/css"
gzip -9 -r -k "${DIR}/frontend/build/static/js"

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