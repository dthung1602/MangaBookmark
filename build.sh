# exit on any failure
set -e

# cd to code root directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "${DIR}"

# generate Swagger doc
echo "Generating swagger doc ..."
yarn --cwd "${DIR}/backend" run gendoc

# build FE
echo "Building FE ..."
yarn --cwd "${DIR}/frontend" run build

if [ "${NODE_ENV}" = "production" ]
then
  # write environment variables to .env
  printenv > .env

  # move build to backend
  echo "Moving frontend build directory to backend ..."
  mv "${DIR}/frontend/build" "${DIR}/backend/frontend-build"

  # remove frontend packages in node_modules to make the build lighter
  echo "Removing frontend packages ..."
  frontend_packages=$(node -e "console.log(Object.keys(require('./frontend/package.json').dependencies))" | tr -d "[],'\"\n")
  frontend_dev_packages=$(node -e "console.log(Object.keys(require('./frontend/package.json').devDependencies))" | tr -d "[],'\"\n")
  yarn --cwd "${DIR}/frontend" remove $frontend_packages $frontend_dev_packages

  # remove dev packages in backend/node_modules to make the build lighter
  echo "Removing backend dev packages ..."
  backend_dev_packages=$(node -e "console.log(Object.keys(require('./backend/package.json').devDependencies))" | tr -d "[],'\"\n")
  yarn --cwd "${DIR}/backend" remove $backend_dev_packages
else
  # create soft link if it does not exist yet
  echo "Creating symlink to frontend build directory ..."
  if [ ! -L "${DIR}/backend/frontend-build" ]
  then
    ln -s "${DIR}/frontend/build" "${DIR}/backend/frontend-build"
  fi
fi